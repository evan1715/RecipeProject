[How to write in a markdown file](https://medium.com/@saumya.ranjan/how-to-write-a-readme-md-file-markdown-file-20cb7cbcd6f)
[Github guide for writing markdown file](https://guides.github.com/features/mastering-markdown/)


/*  2-2-2021
    - Removed unused server folders. Controllers and utils.
    - Since create-react-app is gone, we can remove the ESLint config file. Can use the ESLint extension in VSC.
*/

/*  2-1-2021
    - Moved Babel configuration from package.json to webpack.config.js.
    - Turned on historyApiFallback in webpack. 
    -- historyApiFallback says that we're going to handle all of our routing through React clientside. This will return index.html for all 404 routes.
*/

/*  1-28-2021
    ****New packages. Need to run npm install.
    - Installed sass-loader in order for webpack to be able to properly compile SCSS.
    - Installed react-transition-group from pull.
    - Uninstalled packages that weren't being used.
    - Uninstalled react-scripts from create-react-app.
    
    - Reworked webpack, package.json for all-in-one and working full stack.
    - Set up babel config in package.json
    - Added bundle.js to index.html for when compiled version is used.
    -* Look at notes\notes.txt for information.

    - Got rid of a link to the taco bell image because it no longer worked and caused the page to loop.
*/


/*  1-25-2021
    \general director
    - Added a folder to .gitignore
    - Reorganized package.json
    \notes
    - Added this changelog file.
    - Added notes to npm modules.txt
    \server
    - Fixed typo under \models in userModel.js to represent the user icon under userSchema.methods.toJSON
    - Removed comment about future adding icon to users because that has been added.
    \server\utils
    - Added in a description to time.js for why it's there for now.

    Note to "Team": 
    Try using the VSC extension Code Spell Checker. When there's something you want to be a word, if it doesn't fit the spell checker dictionary, you can right click it and press, "Add Word to User Dictionary"
*/


/*  1-19-2021
    \server
    - Fixed some basic spelling typos in comments in mongoose.js and recipeRouter.js
    - Fixed a typo in userModel.js to correctly return this.toObject(); under userSchema.methods.toJSON.
*/


/*  1-16-2021
    \general directory
    - Added templates folder to .gitignore.
    - Reworked package.json a little.
    \public
    - Added form and button to login to index.html.
    - Added a comment describing what the template-login does in index.html and why.
    \public\templates
    - Developed templates folder to verify from the server and database was working from the clientside.
    - Built an app.js file in \js to fetch from the server.
    - Built a login.html under \views to fill out a form to log in from the browser.
    - Built a small styles.css in \styles to format login.html page.
    \server
    - Added a comment describing what '*' does in an Express route.
    - Created a mongoose method to return db information that would only be needed. Excludes private data such as tokens and password, as well as decreasing the size of it by omitting the icon.
*/


/*  1-12-2021
    \server
    - Commented out some unused requires under \models in recipeModel.js and userModel.js
*/