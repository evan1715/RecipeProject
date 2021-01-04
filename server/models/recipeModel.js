const mongoose = require('mongoose');
const validator = require('validator');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cookTime: {
        type: Number,
        default: 0,
        validate(number) {
            if (number < 0) {
                throw new Error("Cook time must be a positive number.");
            }
        }
    },
    ingredients: [{
        amount: {
            type: Number,
            required: true,
        },
        measurement: {
            type: String,
            required: true
        },
        item: {
            type: String,
            required: true
        }
    }],
    instructions: {
        type: String,
        required: true
    },
    pictures: [{
        picture: {
            type: Buffer
        }
    }],
    owner: {
        //mongoose.Schema.Types.ObjectId is saying that the data stored and owner is going to be an ObjectId.
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //Using reference to User so it'll connect with the User model.
        ref: 'User'
    },
    starred: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});




const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;