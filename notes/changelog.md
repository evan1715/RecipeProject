[How to write in a markdown file](https://medium.com/@saumya.ranjan/how-to-write-a-readme-md-file-markdown-file-20cb7cbcd6f)
[Github guide for writing markdown file](https://guides.github.com/features/mastering-markdown/)





    3-13-2021 - 4-6-2021
    SCSS:
    - Rearranged and cleaned up a bit.
    - Made a pop out modal for sign in, but pending on whether to just make it a page or make the modal work on the burger drop down menu.
    - Fixed issue where @include flexCenter(center); was preventing tab usage on keyboard by getting rid of it from body {}.
    - Added scss for my-account-menu.
    - Added scss for my-account-page.
    Component:
    - Modified CreateAccountModal and SignInModal.
    - Created placeholder account components. SubmitRecipe and ViewMyRecipes.
    -- Renamed them to SubmitRecipePage and ViewMyRecipesPage
    - Created placeholder about page.
    - Created MyAccountMenu, but pending work.
    - Created MyAccountPage.
    - Created modals for MyAccountPage.
    -- Users can now upload or modify their user icon, change their username, email, password, name, log out of all locations, and delete account through the website to the server to the database.
    -- Created errors, closing modals, resetting responses, filtering upload files, and a lot more.
    -- Added URL.revokeObjectURL to UploadUserIconModal to free up temporary browser storage while in the app.
    -- Added timer for modals to exit after successful update.
    -- Added some userinfo to the left side of the page.
    -- If they log out or delete account, they'll be rerouted to the homepage.
    - Got rid of server response message when exiting a modal.
    - Got rid of child key value error on Nav.js and RecipeRoulette.js
    - Fixed up create account, sign in, sign out, view my recipes buttons and modals.
    - Wired up log out.
    - Connected sign in/log out modal to drop-down/pop-out burger menu.
    -- Added feature when clicking a link or button on the popout menu, the menu will close.
    Store:
    - Added support for the Redux Devtool Extension for browsers. With that, had to rearrange the store configuration. 
        - Added a new folder and new .js file for store configuration. Inside is includes reducers and middleware.
        - Removed middleware/index.js & reducers/index.js to the graveyard. Graveyard is a folder in notes.
        - Modified index.js to support these changes.
    - Connected create account and login to redux. Created action and reducer. Saved token to local storage and wired up login.
    Server:
    - Fixed server server issue returning all user info without excluding password, tokens, and icon.
    - Added an error response when can't log in to better handle errors.
    - Decreased the resize of incoming icons from 300x300 to 250x250.
    General:
    - Created separate folder for routers.
    - Made useServerAPI.
    - Reworked useServerAPI and added stuff (like hundreds of times).
    - Modified some package.json scripts, index.html files, webpack, and server.js.
    - Modified some pages to use double quotes in HTML, single quotes in JS, and double quotes when sending messages.
    - Added more notes in the notes folder.
    - Added a one second timer to React loading in so that the server has time to respond with user's information for the page to load properly, especially on private only routes.




    3-8-2021 - 3-9-2021
    Package:
    - Installed react-modal.
    Component:
    - Created CreateAccountModal.js component.
    - Incorporated it into CreateAccount.js component.
    SCSS:
    - Set up _base.scss, _createAccountModal.scss, and styles.scss to style the modal and create organization.
    - Put .button in _base.scss from index.scss
    Hook:
    - Created a useScript hook for incorporating outside scripts. Although, not currently in use.




    2-16-2021
    - Fixed server path to return to the homepage on all unmatched routes.
```JavaScript
    res.sendFile(__dirname, 'index.html');
    //to 
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
```
    - Installed mini-css-extract-plugin webpack plugin to separate CSS files from being rendered in a production build (instead of all in one JS file).
    - Updated webpack to use webpack cli 4.5.0's --node-env cmd.
    - Updated webpack to use a plugin to separate CSS in the build and modified source mapping.
    - Updated webpack for better production vs development modes.




    2-9-2021
    * Need to run npm install
    - Updated the methods of dev server to be simpler and easier. Modified webpack.config, package.json, added dev server.
    - Added this part to a new file called dev-server to enable convenience:
```JavaScript
    //Webpack Dev
    const webpack = require('webpack');
    const webpackDevServer = require('webpack-dev-server');
    const config = require('../webpack.config.js');

    const options = {
        contentBase: './client/public',
        // host: 'localhost',
        historyApiFallback: true, //This will return index.html for all 404 routes.
        open: true,
        liveReload: true
    }
    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);
```




    2-2-2021
    - Removed unused server folders. Controllers and utils.
    - Since create-react-app is gone, we can remove the ESLint config file. Can use the ESLint extension in VSC.




    2-1-2021
    - Moved Babel configuration from package.json to webpack.config.js.
    - Turned on historyApiFallback in webpack. 
    -- historyApiFallback says that we're going to handle all of our routing through React clientside. This will return index.html for all 404 routes.




    1-28-2021
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




    1-25-2021
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




    1-19-2021
    \server
    - Fixed some basic spelling typos in comments in mongoose.js and recipeRouter.js
    - Fixed a typo in userModel.js to correctly return this.toObject(); under userSchema.methods.toJSON.




    1-16-2021
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




    1-12-2021
    \server
    - Commented out some unused requires under \models in recipeModel.js and userModel.js
