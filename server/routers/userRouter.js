/*  Description
    The user will be able to create a login, login, log out, log out of all locations, delete, and update their profile.
*/
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel.js');
const auth = require('../middleware/authentication.js');
const router = new express.Router();

//Create an account & Log in with token.
router.post('/user', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.createToken();

        await user.save();
        res.status(201).send(({ user: user, token: token }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//Log in a user.
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password);
        const token = await user.createToken();

        res.send({ user: user, token: token });
    } catch (e) {
        const error = "Unable to login.";
        res.status(400).send({ error });
    }
});

//Log out a user.
router.post('/user/logout', auth, async (req, res) => {
    try {
        //Filter tokens to log out of this specific location.
        req.user.loginTokens = req.user.loginTokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

//Log out of all locations.
router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        //Set the tokens to an empty array to rid them all.
        req.user.loginTokens = [];
        await req.user.save();
        res.send();
    } catch (error) { 
        res.status(500).send();
    }
});

//View profile. Why doesn't just /user/ work and it's forcing /users/? --- creating patch and delete seemed to fix it.
router.get('/user/profile', auth, async (req, res) => {
    res.send(req.user);
});

//Update a user.
router.patch('/user/profile', auth, async (req, res) => {
    //We'll use Object.keys(req.body) in order to convert an object into an array of its properties.
    const updates = Object.keys(req.body);
    const validUpdates = updates.every((update) => {
        return ['username', 'email', 'password', 'name'].includes(update);
    });

    if (!validUpdates) {
        return res.status(400).send("Update not valid.");
    }
    
    try {
        updates.forEach((update) => {
            //Use bracket notation to access a property dynamically.
            req.user[update] = req.body[update];
        });
        await req.user.save(); //middleware used
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete a user.
router.delete('/user/profile', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});


//Profile icon
const upload = multer({
    limits: {
        filesize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|bmp|gif)$/)) {
            return callback(new Error("Unsupported image file type."));
        }
        //If file is good, null, true to accept file.
        callback(undefined, true);
    }
});

//Upload a user's icon.
router.post('/user/profile/icon', auth, upload.single('icon'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).jpeg().toBuffer();

    req.user.icon = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

//Get user's icon.
router.get('/user/:id/icon', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.icon) {
            throw new Error("None found.");
        }

        res.set('Content-Type', 'image/jpeg');
        console.log(user.icon);
        res.send(user.icon);
    } catch (error) {
        res.status(404).send();
    }
});

//Delete icon.
router.delete('/user/profile/icon', auth, async (req, res) => {
    try {
        req.user.icon = null;
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});





module.exports = router;