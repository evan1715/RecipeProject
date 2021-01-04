/*  Description

*/
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

//auth is short for authentication, authenticate, authorization, authorize,
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const verifySecret = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verifySecret._id, 'loginTokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Did not pass authentication."});
    }
}

module.exports = auth;