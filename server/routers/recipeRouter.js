const express = require('express');
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
router.get('/recipes/:username', async (req, res) => {
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
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });
        
        if (!recipe) {
            return res.status(404).send("Cannot find recipe.");
        }

        res.send(recipe);
    } catch (error) {
        res.status(500).send();
    }
});







module.exports = router;