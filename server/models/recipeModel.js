const mongoose = require('mongoose');
const Filter = require('bad-words');

const filter = new Filter();

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate(input) {
            if (input.length > 50) {
                throw new Error("Title cannot be longer than 50 characters.");
            }
            if (filter.isProfane(input)) {
                throw new Error("That title contains profanity.");
            }
        }
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
            required: true,
            validate(input) {
                if (filter.isProfane(input)) {
                    throw new Error("Your measurements contain profanity.");
                }
            }
        },
        item: {
            type: String,
            required: true,
            validate(input) {
                if (filter.isProfane(input)) {
                    throw new Error("Your ingredient items contain profanity.");
                }
            }
        }
    }],
    instructions: {
        type: String,
        required: true,
        validate(input) {
            if (filter.isProfane(input)) {
                throw new Error("Your instructions contain profanity.");
            }
        }
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


recipeSchema.path('pictures').validate((num) => {
    if (num.length > 5) {
        throw new Error("Maximum number of pictures per recipe is 5.");
    }
});



const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;