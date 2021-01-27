[How to write in a markdown file](https://medium.com/@saumya.ranjan/how-to-write-a-readme-md-file-markdown-file-20cb7cbcd6f)
[Github guide for writing markdown file](https://guides.github.com/features/mastering-markdown/)




/*  1-26-2021
    *New package. Need to run npm install.
    - Installed sass-loader in order for webpack to be able to properly compile SCSS.
    
    *might delete these two:
    - Installed copy-webpack-plugin because it was missing
    - Installed webpack because it wasn't installed already for some reason.
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

    Note to Team: 
    There's a typo in webpack.config.js. 'development' is spelled wrong. Try using the VSC extension Code Spell Checker. When there's something you want to be a word, if it doesn't fit the spell checker dictionary, you can right click it and press, "Add Word to User Dictionary"
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