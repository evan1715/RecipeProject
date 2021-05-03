[How to write in a markdown file](https://medium.com/@saumya.ranjan/how-to-write-a-readme-md-file-markdown-file-20cb7cbcd6f)
[Github guide for writing markdown file](https://guides.github.com/features/mastering-markdown/)




    4-12-2021 - 
    Client:
        Actions:
            - 4-12: Made up a draft for userRecipes actions.
            - 4-13: {
                - Extracted serverErrorAction from account actions and made it its own thing.
                - Edited submitRecipeAction to take in the data received.
            }
            - 4-18: Updated userRecipes. Added clear error.
            - 4-21: Updated recipeRoulette. Added try catch in index.js to still load the app if there is a token, but can't contact database.
            - 4-23: getRecipeAction now takes in data.
            - 4-25: Added a function to convert the buffer image coming in from the database to store the pictures as a binary to make it easier to render them in the userRecipes action file.
            - 4-26: Added buffer to binary image conversion in userRecipes action if the data received is not an array, but is one singular image. It was previously working for only an array of recipes, but not if just one came back. It's fixed now.
        Components:
            - 4-12: Set up a draft for SubmitRecipePage.
            - 4-13: {
                - Since serverError is now its own thing, CreateAccountModal, SignInModal, and all MyAccountModals were modified accordingly to adapt to the new method of handling errors.
                - Cleaned up MyAccountModal some.
                - Expanded SubmitRecipePage by making it more functional and ready to use. Added dispatch, state, selector, use effect, server response handling, adding ingredients, deleting ingredients, mapping and displaying ingredients as they're added, and a place for the response above the buttons.
                - Made an Ingredient.js to see if I am going to extract pieces of SubmitRecipePage into multiple components or not. Pending on what I'll do.
            }
            - 4-17: Fixed a typo error in SubmitRecipePage to serverErrorReducer instead of serverError.
            - 4-18: {
                - Renamed ViewMyRecipesPage to MyRecipesPage. 
                - Drafted AllRecipesPage and adapted userRecipe reducer, & userRecipe action. 
                - Added clearUserRecipes to action and reducer.
                - Updated SubmitRecipePage to return to homepage on submit or cancel button. Added clearing errors.
                - Updated MyRecipesPage to show some functionality to it and list a user's recipes. Adapted action and reducer.
            - 4-23: {
                - MyAccountPage now clears any recipe state, waits for response, then gets pushed to submit recipe page on click.
                - Created a ViewRecipePage draft.
                - Created a RecipeForm component to be reused in submitting a new recipe and editing a previous recipe. Took the previous SubmitRecipePage's and modified to to be applicable to both a new recipe and to edit a recipe.
                - Created an EditRecipePage.
                - Updated SubmitRecipePage to take in RecipeForm component.
                - Updated MyRecipesPage to handle deleting a recipe, confirming with the user to delete the recipe, getting the new recipe list after deleting, and pushing to the edit page when button is clicked. Only pushes once the store has been updated from the server's database. 
            }
            - 4-25: {
                - Centered the title on SubmitRecipePage and EditRecipePage.
                - MyRecipesPage was updated to now include ModifyRecipePicturesModal, increased font size of title, added some CSS, added button to modify pictures to display them, delete, and upload.
                - Created RecipePicturesModal to view images, delete them, upload, dispatch actions, process incoming files, process other data, and usage of multiple files to upload.
            }
            - 4-26: {
                - Re-enabled initial load of recipe roulette on the homepage.
                - Removed unused file FilterIngredients and put it in the graveyard.
                - Added functionality and database recipe information to ViewRecipePage to actually view recipes now (finally).
                - Wired up MyRecipesPage to ViewRecipe page whenever one hits "view" on the selected recipe. Checks that the reducer has changed before going. However, might change this to direct database api and use recipe id's in the URL directly to view them.
                -- MyRecipesPage now goes to history.push(`/recipe?id=${recipe._id}) on click to View button.
                - After renaming useServerAPI to userServerAPI, all components were modified to adapt to change.
                - ViewRecipePage now takes in the location of the URL, takes the recipe_id off of the URL, dispatches to get the recipe with the id, and only renders the information if successful fetched recipe.
                - Anyone can now visit /recipe?id={recipe_id} whether they're a user or not and still view the recipe.
            }
            - 5-2: {
                - Renamed ModifyRecipePicturesModal to ModifyPicturesModal. Added functionality to select which picture to delete or to just delete all. Added a question asking for confirmation to delete all pictures. Modal closes on upload or delete submission. Added some styles.
                - MyRecipePage now has a function to handle edit recipe. It takes in the recipe_id and it dispatches show loading bar as well as a couple other things. Changed variable names to reflect modal name change.
                - ViewRecipePage had quite a bit done to it. It now dispatches showing loading bar when opening. Added image slideshow, image selection, arrow functionality, and other things. Added styles to the images as well.
                - ViewRecipePage now only loads the pictures section if the recipe has pictures.
                - MyAccountPage buttons View or edit my recipes & Submit a new recipe are now link-based instead of history. Same for MyRecipePage's view button and My Account button in nav. Allows a user to open a new tab of the link if they wanted (I do this often). Added styles to incorporate this. The CSS was the torture of it.
            }
        Database/Hooks/Utilities:
            - 4-12: Made a draft for recipeServerAPI for fetching from the server.
            - 4-13: {
                - useServerAPI now reflects the serverError difference and was cleaned up some.
                - recipeServerAPI was modified to reflect separate file for serverErrorAction and modified some of the fetch, mainly submitRecipe.
            }
            - 4-18: Improved error handling for recipeServerAPI.
            - 4-23: getRecipe now takes in the data to dispatch. updateRecipe now has checks before dispatching.
            - 4-25: Created a function to handle a response without json to avoid error in console "error at json row 1, column 1" thing. Catch error now only console logs goes if error exists. Created a loop to append pictures to get ready to send to the server. Modified delete pictures to temporarily delete all with ?image=all query.
                - Renamed useServerAPI to userServerAPI and placed in in the database folder instead of hook folder.
            - 5-2: Added pic_id to query picture deletion.
        Index:
            - 4-18: Updated index.js to now use async to get the user to load the app. This'll be better than a simple 1 second timer before loading the app.
            - 4-21: Added try catch in index.js to still load the app if there is a token, but can't contact database.
        Reducers:
            - 4-12: Created a draft for userRecipe reducer.
            - 4-13: {
                - Extracted serverError from accountReducer and made its own reducer.
                - userRecipeReducer now takes in the data from action.
            }
            - 4-18: Updated user recipes. Added clear error.
            - 4-21: Updated recipeRoulette.
            - 4-23: GET_RECIPE now takes in data.
        Router:
            - 4-18: Changed ViewMyRecipesPage to MyRecipesPage. Added AllRecipesPage.
            - 4-23: Updated AppRouter to include ViewRecipePage and EditRecipePage. Organized the imports area alphabetically and the route section.
            - 4-26: Attempted lazy loading page components in router, but I put it back to regular imports for now. It didn't seem to reduce the size enough for me. To be determined later.
        SCSS:
            - 4-25: Added _my-recipes-page.scss and _recipe-form.scss then included them in styles.scss master file.
            - 5-2: {
                - Base file now has cursor: pointer; to be used as needed.
                - Created a view-recipe-page to include styles for the recipe pictures. It was based on w3school's examples. Great resource.
                - Modal file was changed to add modal__pictures to increase the width to hold the pictures.
                - Popout nav was modified so that the dropdown menu was closer to the button. Also added z-index to ensure it is placed on top of everything when open.
                - Added view_recipe_page.scss to styles.scss main file.
            }
        Store:
            - 4-13: Added serverErrorReducer.
            - 4-18: Redux logger now collapses messages so it doesn't take up as much space.
    General/Notes:
        - 4-12: Edited changelog and ideas.
        - 4-13: Edited changelog and notes.
        - 4-18: Updated packages and installed @babel/plugin-transform-runtime, @babel/runtime, and css-minimizer-webpack-plugin. Updated webpack, changed the plugin condition, and included css minimizer plugin as well as plugin-transform-runtime.
        - 4-19: Deleted/moved files (middleware/logger.js, actions/shared.js, hooks/useAxios.js, hooks/useScript.js) to graveyard that weren't being used.
        - 4-23: Added SubmitRecipePage without RecipeForm component to the graveyard. Updated notes.
        - 4-25: Updated changelog and ideas.
        - 4-26: Updated changelog. Put FilterIngredient in the graveyard since it's being unused. Renamed the copy of submit recipe page without the word "copy" in it. Added RandomRecipe to graveyard since it wasn't in use.
        - 5-2: Updated notes.
    Server:
        - 4-13: Started to add a function to add on ingredients, but pending finishing it and usage of it.
        - 5-2: Added query processing to delete images based on picture id.





    3-13-2021 - 4-11-2021
    SCSS:
    - Rearranged and cleaned up a bit.
    - Made a pop out modal for sign in, but pending on whether to just make it a page or make the modal work on the burger drop down menu.
    - Fixed issue where @include flexCenter(center); was preventing tab usage on keyboard by getting rid of it from body {}.
    - Added scss for my-account-menu.
    - Added scss for my-account-page.
    Component:
    - Modified CreateAccountModal and SignInModal.
    -- Added html type password & type email.
    -- Reset states on close.
    -- CreateAccountModal now has verify password for the user to type twice. Added check to ensure both passwords are the same.
    -- CreateAccountModal now has props.handleCloseModal() in onAfterClose to close the modal after a successful login and the buttons change. This was because if the user immediately logged out after creating an account, the modal would pop up again.
    - Created placeholder account components. SubmitRecipe and ViewMyRecipes.
    -- Renamed them to SubmitRecipePage and ViewMyRecipesPage
    - Created placeholder about page.
    - Created MyAccountMenu, but pending work.
    - Created MyAccountPage.
    - Created modals for MyAccountPage. {
        -- Users can now upload or modify their user icon, change their username, email, password, name, log out of all locations, and delete account through the website to the server to the database.
        -- Created errors, closing modals, resetting responses, filtering upload files, and a lot more.
        -- Added URL.revokeObjectURL to UploadUserIconModal to free up temporary browser storage while in the app.
        -- Added timer for modals to exit after successful update.
        -- Added some userinfo to the left side of the page.
        -- If they log out or delete account, they'll be rerouted to the homepage.
        -- Renamed openModal to signinModal, put modal closed when logging out.
        -- Set all modals to reset responses and state once modal closes. 
        -- Opening a modal now also resets response.
        -- Better cleared errors by dispatching server response to null upon closing modals.
        -- Added current password check when setting a new password.
        -- Renamed AccountModals.js to MyAccountModals.js to align with MyAccountPage
        -- Closing modals reset states on close.
        -- Changing password now asks for previous password, checks it on the server, blurs the passwords with html type password, and now has a toggle for each field to view the password or to blur it again.
        -- Added dispatch checks {
            -- If there is no iconFile, it will be returned and not dispatch.
            -- If there is no icon to delete, it will not dispatch.
            -- If there is no username and the username hasn't changed, it will not dispatch.
            -- If there is no email and the email hasn't changed, it will not dispatch.
            -- If there is no password in all three fields, it will not dispatch.
            -- If there is no name and the name hasn't changed, it will not dispatch.
        }
    }
    - Got rid of server response message when exiting a modal.
    - Got rid of child key value error on Nav.js and RecipeRoulette.js
    - Fixed up create account, sign in, sign out, view my recipes buttons and modals.
    - Wired up log out.
    - Connected sign in/log out modal to drop-down/pop-out burger menu.
    -- Added feature when clicking a link or button on the popout menu, the menu will close.
    - Got rid of [dispatch] on useEffect in RecipeRoulette so it doesn't fire every time there's a dispatch.
    - Commented out the RecipeRoulette useEffect so it doesn't fire when initially loading for now. Helps clear up the console logs and redux logger.
    Store:
    - Added support for the Redux Devtool Extension for browsers. With that, had to rearrange the store configuration. 
        - Added a new folder and new .js file for store configuration. Inside is includes reducers and middleware.
        - Removed middleware/index.js & reducers/index.js to the graveyard. Graveyard is a folder in notes.
        - Modified index.js to support these changes.
    - Connected create account and login to redux. Created action and reducer. Saved token to local storage and wired up login.
    Router: 
    - Set up user private routes and redirect user if they aren't authenticated to the homepage if they're trying to access user pages.
    Server:
    - Fixed server server issue returning all user info without excluding password, tokens, and icon.
    - Added an error response when can't log in to better handle errors.
    - Decreased the resize of incoming icons from 300x300 to 250x250.
    - Added previousPassword check to updating user password in userRouter.
    General:
    - Created separate folder for routers.
    - Made useServerAPI.
    - Reworked useServerAPI and added stuff (like hundreds of times).
    -- Added better error handling of useServerAPI
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
