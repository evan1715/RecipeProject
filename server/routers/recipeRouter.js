const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Recipe = require('../models/recipeModel.js');
const User = require('../models/userModel.js');
const auth = require('../middleware/authentication.js');
const router = new express.Router();


router.post('/recipes', auth, async (req, res) => {
    //...req.body will copy all of the properties from body to this object.
    const recipe = new Recipe ({
        ...req.body,
        owner: req.user._id
    });
    
    try {
        await recipe.save();
        res.status(201).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

//No authentication to get all recipes listed.
//NEEDS PAGNATION
router.get('/recipes/all', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.send(recipes);
    } catch (error) {
        res.status(500).send();
    }
});

//Get a user's submitted recipes.
//NEEDS PAGNATION
router.get('/recipes/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const recipes = await Recipe.find({ owner: user._id });

        res.send(recipes);
    } catch (error) {
        res.status(404).send("User not found.");
    }
});

//Get a recipe by id.
router.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe) {
            return res.status(404).send("Cannot find recipe.");
        }

        res.send(recipe);
    } catch (error) {
        res.status(500).send();
    }
});

//Update a recipe.
router.patch('/recipes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = updates.every((update) => {
        return ['title', 'cookTime', 'ingredients', 'instructions', 'pictures'].includes(update);
    });

    if (!validUpdates) {
        return res.status(400).send("Update not valid.")
    }

    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, owner: req.user._id });

        if (!recipe) {
            return res.status(404).send("Cannot find recipe.")
        }

        updates.forEach((update) => {
            recipe[update] = req.body[update];
        });
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete a recipe.
router.delete('/recipes/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        
        if (!recipe) {
            return res.status(404).send("Cannot find recipe.");
        }

        res.send(recipe);
    } catch (error) {
        res.status(500).send();
    }
});




//Recipe pictures
//Documentation - https://www.npmjs.com/package/multer 
const upload = multer({
    limits: {
        filesize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|bmp)$/)) {
            return callback(new Error("Unsupported image file type."));
        }
        //If file is good, null, true to accept file.
        callback(undefined, true);
    }
});

//Upload picture(s) of the food
router.post('/recipes/:id/pictures', auth, upload.array('pictures', 5), async (req, res) => {
    
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, owner: req.user._id });

        //const recipe = await Recipe.findOne(req.user._id);
        // if (req.user._id.toString() !== recipe.owner.toString()) {
        //     return res.status(403).send("User is not owner of the recipe.");
        // }

        if (!recipe) {
            return res.status(404).send("Cannot find recipe.");
        }

        for (var i = 0; i < req.files.length; i++) {
            const buffer = await sharp(req.files[i].buffer).resize({ width: 640, height: 360 }).jpeg().toBuffer();
            recipe.pictures = recipe.pictures.concat({ picture: buffer });
        }

        await recipe.save();
        res.send();
    } catch (error) {
        //Catch to handle Mongoose schema/model errors
        res.status(400).send({ error: error.message });
    }
}, (error, req, res, next) => {
    //This to handle multer upload errors
    res.status(400).send({ error: error.message });
});

//Get picture(s)
//What if we used pagnation or populate for the individual images in the pictures array? Query strings?
router.get('/recipes/:id/pictures', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        const pic = req.query.image;

        if (!recipe || !recipe.pictures) {
            throw new Error("None found.");
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(recipe.pictures[pic].picture);
    } catch (error) {
        res.status(404).send();
    }
});

//Delete picture(s) of the food.
//What if we used pagnation or populate for the individual images in the pictures array? Query strings?
router.delete('/recipes/:id/pictures', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, owner: req.user._id });

        if (!recipe || !recipe.pictures) {
            throw new Error();
        }

        if (req.query.image === 'all') {
            recipe.pictures = [];
        }
        await recipe.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});






module.exports = router;