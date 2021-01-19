const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Recipe = require('./recipeModel.js');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(input) {
            if (input === null) {
                throw new Error("Must provide a username.");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(input) {
            if (!validator.isEmail(input)) {
                throw new Error("Email is invalid.");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(input) {
            if (input < 8) {
                throw new Error("Password must be at least eight characters.");
            }
            if (input.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain the word password.");
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    //JSON web tokens so users can have logged in sessions. An array of them will allow multiple sessions.
    loginTokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    icon: {
        type: Buffer
    }
}, {
    timestamps: true
});

//Secure and hash a user's password.
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { //this = this specific user.
        this.password = await bcrypt.hash(this.password, 8); //Run the hash 8 times.
    }
    next();
});

//Create login tokens.
userSchema.methods.createToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);

    this.loginTokens = this.loginTokens.concat({ token: token });
    await this.save(); //this = this specific user.

    return token;
}

//Login the user by comparing the email and password to match.
userSchema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({ email: email });
    const userPassMatch = await bcrypt.compare(password, user.password);

    if (!user || !userPassMatch) {
        throw new Error("Unable to login.");
    } else {
        return user;
    }
}

//Let's hide some user data here so the db only sends what's needed when called.
/*  .toJSON allows us to use this function without actually calling it in the user routers.
    When we send res.send(), it's calling JSON.stringify() by default. Whenever .toJSON is called,
    the object gets stringified. This allows us to manipulate what exactly comes back when we stringify the object. */
userSchema.methods.toJSON = function() {
    //this being this user
    delete this.toObject().password; //don't want that to be seen
    delete this.toObject().tokens; //don't want tokens to be taken
    delete this.toObject().avatar; //decrease the size of the profile

    return this.toObject();
}

//Link together recipes with a user who will create them.
userSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'owner'
});


//Pass the User mongoose model out.
const User = mongoose.model('User', userSchema);
module.exports = User;