const path = require('path'); //core module
const express = require('express'); //npm module
require('./database/mongoose.js'); //start the db with the server
const userRouter = require('./routers/userRouter.js');
const recipeRouter = require('./routers/recipeRouter.js');

const app = express();

//Have Express automatically configure incoming JSON. Allows us to have an object that is accessible in our request handlers by using req.body
app.use(express.json());
//Tell Express to use our routes
app.use(userRouter);
app.use(recipeRouter);
//This is a setup for the static directory. It will use all .html pages in the public folder to go to different paths.
app.use(express.static(path.join(__dirname, '../client/public')));

//'*' is a wildcard character in Express that we can use to mean, "match anything that we haven't matched so far."
//Using this, it'll match all unmatched routes.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}.`);
});