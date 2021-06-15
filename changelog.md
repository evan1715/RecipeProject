[How to write in a markdown file](https://medium.com/@saumya.ranjan/how-to-write-a-readme-md-file-markdown-file-20cb7cbcd6f)
[Github guide for writing markdown file](https://guides.github.com/features/mastering-markdown/)






    5-17-2021 - 
    Client:
        Actions:
            - 5-17: Recipe roulette action now uses fetch instead of axios.
            - 5-18: Recipe roulette action now has hide loading bar after the reducer dispatch. File allRecipes now implicitly returns the action to the reducer.
            - 5-23: Added a new action for userProfile to store viewing a profile for userinfo and recipe data.
            - 5-26: Selected recipe will now only process picture data if it is user-based and not spoonacular api.
        Components:
            - 5-17: Added "whole" as a measurement option on RecipeForm. Created a very simple page to display measurement conversions. Added it to nav, router, and added css for it.
            - 5-17:
                - Improved network efficiency by not re-fetching the icon every time the My Account component loads. Changes made to MyAccountModal and MyAccountPage. If no icon is in store, it'll dispatch a fetch.
                - Extracted the username fetch request and put it in its own file in utils. The page now calls that action then dispatches out to the store to hold the usernames to be reused.
            - 5-21: Fixed an issue in ViewRecipePage where the previous state username was displaying instead of the current one.
            - 5-22: ViewRecipePage now displays the recipe better. MyAccountPage now displays the three most recent recipes submitted. Added in a fetch to get the user recipes on the page too.
            - 5-23:
                - Created a UserProfilePage to display a user's info, recipe, icon, etc. Can click each recipe to go view it. Added recipes and recent recipes to the page. Utilized grid.
                - MyRecipesPage now centers the message of not having any recipes submitted. There's now a button for "View my profile" on the page.
                - AllRecipesPage now links to a user's profile page if they click the username under a recipe.
                - ViewRecipePage now will not fetch if the same recipe is already stored in redux instead of fetching on every load. Changed the first div at the beginning of the html to a react/div fragment.
            - 5-24:
                - Created LeftColumn and RightColumn components to house most recent recipes & userinfo on left and icon and button on the right. Now using it for MyAccountPage, MyRecipesPage, and UserProfilePage to display most recent recipes, userinfo, and icon. It will change based on if it's the user's info or if it's a profile they're viewing. Redid CSS to simplify the column layouts by creating a columns.scss and merging multiple styles from these pages into that one.
                - Log out will now clear selected recipe and user recipes reducers.
            - 5-25:
                - Rewrote RecipeRoulette component and associated CSS to fix a bug.
                - Added a title to RightColumn.
                - Added columns--hide styling to MyRecipes page to hide them on smaller screens. Doesn't seem necessary at on this page to display the information in the columns.
                - Reworked second row nav to display on smaller screens. Made the second row nav into its own component file called NavBottom. Created styles for it.
            - 5-26:
                - ViewRecipePage can now display recipes from the spoonacular api.
                - Added "pkg" to RecipeForm list of options for measurements.
                - RecipeRoulette cards are now clickable to view their details.
                - Moved CreateAccountModal.js to nav folder. Adjusted CreateAccount.js to import correctly.
                *- Redid the entire nav code.
                    - Nav.js is now the main file where all nav components come into one.
                    - Created NavTop.js and NavPopout.js.
                    - Now on smaller windows, only one nav row will show instead of a top and bottom. The top and bottom will still show on a desktop or a screen wide enough to support it.
                    - The two burger menus were merged together into one to condense the size from two nav rows into one for smaller screens. The menu was reorganized and includes pages and account links.
                    - Account links in burger menu will change depending on if the user is logged in or not.
                    - I decided to keep the changing color burger menu. It is red if not logged in, green if logged in.
                    - Removed the burger menu case from the second row/NavBottom since NavBottom is now only used on larger screens and since there is only one burger menu now.
                    - Instead of having two files for MyRecipesButton and MyAccountButton, the both of them are now located in NavBottom.js instead of separated.
                    - The method of listing links in the menu is now raw link format rather than mapping links.
                    - NavTop and NavBottom are now both used in desktop while NavPopout is for smaller.
                    - NavPopout is the smaller screen burger menu file that will display all links. It will dynamically change based on whether a person is logged in or not.
                - Fixed bug that would crash the app with left column loading recipes.
                - Fixed missing action import on MyRecipesPage.
                - Fixed two errors on RecipeForm. One was a typo including a " on pkg in ingredient. The other was nesting a <p> instead of a <p> with the error response.
                - NavTop and NavPopout now include a logo file import that webpack will handle. Nav bar finally has a logo again.
                - ViewRecipePage now only shows a gallery bar below the image if there's more than one image.
                - Fixed error in UserProfilePage that added an extra ? in the url param.
                - ViewRecipePage gallery is now centered and a max-height of 150px.
            - 6-4: Commented out unused nav links in NavPopout and NavTop. Created footer file. Home link is now available in nav.
            - 6-7:
                - Added Create Account button to top nav. Removed unused links in PopoutNav.js and TopNav.js.
                - Made SearchBar functional by sending the search to the url and pushing to SearchResultsPage as well as ability to hit enter on keyboard.
                - Made use of PopulateRecipe to have recipes and data passed into it to show the grid.
                - AllRecipesPage now utilizes PopulateRecipe component.
                - CreateAccountModal, SignInModal, ChangeUsernameModal, ChangeEmailModal, ChangePasswordModal, and ChangeNameModal will now submit when the Enter key is pressed on keyboard.
                - DeleteAccountModal now disables the button unless the username matches. It now clears state when modal closes.
                - Delete button on MyRecipes page now has a pop up modal to ask if the user to confirm to delete the selected recipe.
                - Created SearchResultsPage to display results using spoonacular search. Utilizes PopulateRecipes to display them.
                - Modified PopulateRecipes to support spoonacular recipes and user recipes.
                - SearchBar now clears on submit.
            - 6-8:
                - Search results will now use a smaller data fetch for faster results. It will just display the picture and the title of a recipe.
                - Added information on why it is only a spoonacular search and not a user recipe search.
                - ViewRecipePage now has clickable username to view a user's profile.
            - 6-13: Fixed an issue on search results page. Fixed issue of displaying a link on a username when no user account was found for it.
            - 6-14: Removed unused code in UserProfilePage. Modified RecipeRoulette, NavBottom, NavTop, NavPopout, and SearchBar to use svg icons from react-ionicons to save bundle size a good chunk.
            - 6-15: Search results without any results now displays a message.
        Database:
            - 5-17: userServerAPI under getIcon now hides loading bar if there is no icon on the account.
        Index:
            - 5-23: Renamed the route of /profile to /me in the fetch.
            - 6-14: User will now be logged out and token deleted locally if no account is found even though they have a token. They will have to login again or create another account.
        Reducers:
            - 5-23: Added a new reducer for userProfile to store viewing a profile for userinfo and recipe data.
        Router:
            - 6-4: Commented out unused nav links. Included footer file.
            - 6-7: Added SearchResultsPage to AppRouter. Removed unused routes.
            - 6-14: Disabled lazy loading and returned to regular imports. The app is small enough to not really need lazy loading. It's a faster app with it all together too.
        SCSS:
            - 5-22: Added some CSS to view recipe page styling.
            - 5-23: Added CSS Grid to user-profile-page with page resizing and recipe listing.
            - 5-24:
                - Created columns.scss to use for the left, right, and center columns that will display for MyAccountPage, MyRecipesPage, and UserProfilePage.
                - Deleted my-account-page.scss since the styling was merged into the columns. Took out the same styling that was in my-recipes-page.scss and user-profile-page.scss since they're also using the columns.scss file.
                - Readjusted image sizing for recipe roulette and all recipes. Fixed typo for # id to className . in recipe roulette.
            - 5-25:
                - Redid recipe roulette CSS for cleaner, easier method and to fix mobile issue.
                -- Added a top margin for smaller screen for the title area.
                - Added flex-wrap to the columns container. Added smaller screen adjustment to change the order, margin, sizing, centering, and whether to display it or hide it depending on the page.
                - Reworked second row nav to work with a smaller screen. Created a separate file for it called _nav-bottom. It'll now have a dropdown menu and adapt to screen size.
                - User profile now goes into column view per recipe when on 1 column to fit a smaller screen. Decreased the width of the card too.
            - 5-26:
                - Adjusted _recipe-roulette card height to fit ones with longer titles.
                *- Redid the entire code for nav.
                    - All nav-related styles will now be in their own folder rather than all in the component folder.
                    - The nav will switch based on width on whether it will use the desktop nav or the mobile nav.
                    - Created _nav-top.scss and nav-popout.scss to style the new format and files.
                    - Removed smaller screen styling for nav-bottom since it is no longer used.
                - Made the logo image in the nav bar smaller from 75px to 60px.
                - Fixed issue of image going out of recipe cards.
                - ViewRecipePage gallery is now centered and a max-height of 150px.
                - Adjusted the height of the logo when on a smaller screen from 60px to 40px.
            - 6-4:
                - Renamed some files to exclude the "page" at the end of files.
                - Created a footer file.
                - Add ingredients on recipe form will now go to into a column style on a smaller screen.
                - Recipe Form ingredients buttons are now styled and are readjusted in size. Modified for better visual experience.
                - Added ingredients on recipe form will now go into column style on a smaller screen.
            - 6-7: Styled footer some. Has much better spacing between body now.
            - 6-8:
                - Adjusted styles to better position the footer on all pages.
                - Image and searchbar are now more aligned on smaller screens.
                - MyRecipes listed recipes now have a border to better separate them visually.
                - Links are now more visibly clear by adding darkblue to the color of the text of links.
            - 6-13: Adjusted instructions on ViewRecipePage to fill out the page more on smaller screens.
            - 6-14: Fixed a typo in the styles.scss file.
        Store:
            - 5-23: Uninstalled thunk and extracted the file itself to router folder. This should allow for smaller compile. Added the new userProfile reducer.
        Utilities:
            - 5-18: Created processUsernames.js which was extracted from AllRecipesPage to process usernames and store them. This method will reduce network by using what we already have by storing it.
    General/Notes:
        - 5-17: Uninstalled axios. Allows for smaller compile. Adapted webpack to it.
        - 5-18: Renamed home-components folder to home and renamed account-components to account.
        - 5-23: Uninstalled thunk and extracted the file itself to router folder. This should allow for smaller compile.
        - 5-24: Cleaned up graveyard some. Also cleaned up SCSS some.
        - 5-25: Removed thunk package from webpack cache.
        - 5-26:
            - Placed MyAccountButton.js, MyRecipesButton.js, Nav.js, NavBottom.js, _nav-bottom.scss, and _nav.scss to the graveyard.
            - Installed file-loader and configured webpack to use it.
            - Including a logo file to use on the website. It'll utilize file-loader.
        - 6-8: Cleaned up files. Removed unused code, added comments, removed comments, etc.
        - 6-14:
            - Created a README.md file.
            - Removed unused file, processIndividualImage.js, in utils folder.
            - Updated gitignore.
            - Modified npm modules & package.json:
                - Updated @babel/runtime, monogdb, mongoose, react, react-dom, react-redux, react-transition-group, sharp, validator, @babel/core, @babel/plugin-transform-runtime, @babel/preset-env, @babel/preset-react, concurrently, css-loader, mini-css-extract-plugin, react-modal, redux, sass, sass-loader, webpack, and webpack-cli.
                - Switched @babel/runtime to a dependency since it's on the runtime.
                - Removed style-loader in favor of mini-css-extract-plugin.
                - Removed webpack-dev-server since it isn't really used anymore.
                - Removed css-minimizer-webpack-plugin because it only reduced the size of the styles file by 0.3kb.
                - Removed react-ionicons and am just using the icons itself as svg tags to decrease the size of the bundle by ~54kb.
                - Modified package.json scripts to reflect the change of deleting dev-server.js and server.js.
            - Modified webpack. 
                - Removed css-minimizer-webpack-plugin and style-loader usage in webpack config.
                - Removed the misc cache group since it didn't seem necessary. 
                - Removed the devMode conditional on plugins and loader so it just uses the mini-css-extract-plugin every time, whether on prod or dev.
                - Decreased the amount of lines of code by modifying the config some.
                - Removed some packages from the cache group that weren't changing the sizes anyway.
                - Cleaned up the config file.
                - Removed some modules from the cache group because they weren't changing the file sizes anyway.
                - Adjusted the paths to just public folder since dev-server was deleted.
    Server:
        - 5-23: Added a new route to userRouter to get a user's info to view their profile without auth. Renamed the user login from /profile to /me.
        - 6-14: Removed dev-server.js. Modified server.js to just use the public folder instead of public\dist.










    4-12-2021 - 5-16-2021
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
            - 5-3: {
                - Removed unused actions. 
                - Added moment in to replace a recipe's date style for all data incoming for easier access on dates. 
                - Changed the name of the function to processData instead of convertBufferToImage since it is now multifunctional.
            }
            - 5-9: {
                - Extracted processData function and put it in a utils file for other files to use.
                - Created selectedRecipes action file to store one recipe at a time. It'll be used for editing a recipe and viewing a recipe. This will also benefit instead of calling fetch to get the recipe to edit, we just transfer what's stored already into the editing process.
            }
            - 5-16: Added a new action & reducer called AllRecipes to handle all recipes, search results, and hold usernames for gotten recipes. Modified userRecipes.js.
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
            - 5-3: {
                - Added a view button-link to AllRecipesPage to link to the recipe listed.
                - In ModifyPicturesModal, changed button Delete selected to Delete one.
                - Added MyRecipesButton to second row nav.
                - Renamed MyAccountMenu to MyAccountButton. Decided not to do a dropdown menu for it.
                - Renamed the nav-components folder to just nav because of redundancy.
                - Created MyRecipesButton for second row nav.
            }
            - 5-4: {
                - Added more information on AllRecipesPage. Put everything in HTML table format. A user can now click a link to view a recipe, see an image of the recipe, recipe title, cook time, time submitted, and user who submitted it. Since we're using fetch requests per recipe to obtain the usernames, I made a storage & check code block to ensure we don't fetch more times than we need to. If the owner id matches up to a username we've already fetched, it won't fetch it again.
            }
            - 5-5: {
                - ViewRecipePage now only shows "Last updated" when the date is not the same as when it was submitted. Also cleaned up some.
                - SubmitRecipePage and EditRecipePage now return to /myrecipes when something is submitted. Cleaned up some.
                - RecipeForm functions now implicitly returns when possible. Cancel button now returns back to /myrecipes instead of homepage. Cleaned up some.
                - Cleaned up some in CreateAccountModal and AllRecipesPage.
            }
            - 5-8: RecipeRoulette now only loads recipes once instead of every time the component loaded. To refresh, the user must refresh the app or hit the spin button.
            - 5-9: {
                - Created PopulateRecipes component. The goal of it is to be used for future search results, All Recipes page, and potentially others. Added CSS Grid for it too.
                - Modified EditRecipePage, MyAccountPage, MyRecipesPage, RecipeForm, and ViewRecipePage to reflect on the new selectedRecipe reducer.
                    -- EditRecipePage will clearSelectedRecipe when returning to /myrecipes onSubmit.
                    -- MyAccountPage will now clearSelectedRecipe when clicking "Submit a new recipe" instead of clearing userRecipes.
                    -- MyRecipesPage will now use editRecipeAction in selectedRecipeReducer, not dispatch to server to get the recipe to edit, and push to /editrecipe?id=${id}. The function handleDeleteRecipe is now simplified onto one line and implicitly returns. Removed approveEditPush stuff.
                    -- RecipeForm now uses the selectedRecipeReducer and will clear selected recipe when cancel button is clicked.
                    -- ViewRecipePage now uses selectedRecipeReducer instead of userRecipeReducer.
                - EditRecipePage now returns to /myrecipes page if no recipe is stored selectedRecipe. User must click the "Edit" button on /myrecipes page to edit.
            }
            - 5-16: Placed cancel button functionality into a separate function on RecipeForm. Styled the form. Added a dropdown selection for measurements of ingredients. Set maxlength & types for inputs. Added labels. AllRecipesPage uses the CSS Grid method for listing recipes from PopulateRecipes. Pending on future usage of PopulateRecipes still.
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
            - 5-3: Got rid of getPictures for recipes and unused imports.
            - 5-4: Cleaned up some in recipeServerAPI.
            - 5-8: Handled errors for profanity filter in userServerAPI.js and recipeServerAPI.js. Trying out error on title length.
            - 5-9: {
                - Made a utils folder and put processData function in it for other files to use too.
                - recipeServerAPI now calls in viewRecipeAction and dispatches to it on getRecipe call.
            }
            - 5-16: Modified recipeServerAPI to use the new action/reducer for allRecipes. Cleaned up some.
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
            - 5-9: Created selectedRecipeReducer to edit and view a single recipe instead of clearing out the array of recipes we already have. This will also benefit instead of calling fetch to get the recipe to edit, we just transfer what's stored already into the editing process.
            - 5-16: Added a new action & reducer called AllRecipes to handle all recipes, search results, and hold usernames for gotten recipes. Modified userRecipes.js.
        Router:
            - 4-18: Changed ViewMyRecipesPage to MyRecipesPage. Added AllRecipesPage.
            - 4-23: Updated AppRouter to include ViewRecipePage and EditRecipePage. Organized the imports area alphabetically and the route section.
            - 4-26: Attempted lazy loading page components in router, but I put it back to regular imports for now. It didn't seem to reduce the size enough for me. To be determined later.
            - 5-9: Added PopulateRecipe to Wine Pairing route for now.
            - 5-16: Pages are now set up to use React.lazy load.
        SCSS:
            - 4-25: Added _my-recipes-page.scss and _recipe-form.scss then included them in styles.scss master file.
            - 5-2: {
                - Base file now has cursor: pointer; to be used as needed.
                - Created a view-recipe-page to include styles for the recipe pictures. It was based on w3school's examples. Great resource.
                - Modal file was changed to add modal__pictures to increase the width to hold the pictures.
                - Popout nav was modified so that the dropdown menu was closer to the button. Also added z-index to ensure it is placed on top of everything when open.
                - Added view_recipe_page.scss to styles.scss main file.
            }
            - 5-3: Put _my-account-menu.scss in the graveyard. Added the stuff in there to nav.scss. Added css for my recipes button in nav.
            - 5-4: Added _all-recipes-page.scss and some minor styling.
            - 5-9: Added _populate_recipes.scss using CSS Grid to list recipes. Also modified _my-account-page so things align better. Modified files: styles, _settings, _my-account-page, and _populate-recipes.
            - 5-16: Styled _recipe-form.
        Store:
            - 4-13: Added serverErrorReducer.
            - 4-18: Redux logger now collapses messages so it doesn't take up as much space.
            - 5-9: Added selectedRecipeReducer.
            - 5-16: Added allRecipesReducer.
    General/Notes:
        - 4-12: Edited changelog and ideas.
        - 4-13: Edited changelog and notes.
        - 4-18: Updated packages and installed @babel/plugin-transform-runtime, @babel/runtime, and css-minimizer-webpack-plugin. Updated webpack, changed the plugin condition, and included css minimizer plugin as well as plugin-transform-runtime.
        - 4-19: Deleted/moved files (middleware/logger.js, actions/shared.js, hooks/useAxios.js, hooks/useScript.js) to graveyard that weren't being used.
        - 4-23: Added SubmitRecipePage without RecipeForm component to the graveyard. Updated notes.
        - 4-25: Updated changelog and ideas.
        - 4-26: Updated changelog. Put FilterIngredient in the graveyard since it's being unused. Renamed the copy of submit recipe page without the word "copy" in it. Added RandomRecipe to graveyard since it wasn't in use.
        - 5-2: Updated notes.
        - 5-3: Updated changelog and ideas. Installed npm packages moment and moment-locales-webpack-plugin. Updated webpack config file to use new plugin.
        - 5-5: {
            - Installed html-webpack-plugin and reconfigured webpack to use it. 
            - Introduced split chunking to cache certain node modules. Two packages were cached, axios and moment. In the react_redux group, react, react-dom, react-ionicons, react-modal, react-redux, react-redux-loading-bar, react-router-dom, react-transition-group, redux, redux-logger, and redux-thunk were all cached.
            -- The axios_moment group caches 71.1 KB and the react_redux bundle caches 207 KB. This leaves the index bundle at 121 KB.
            - Changed gitignore to ignore all of the public folder now. For some reason, it isn't ignoring the two index.html files, but it's fine. I don't mind.
            - Updated changelog and ideas.
        }
        - 5-8: Installed bad-words package to filter profanity in userinfo and recipes.
        - 5-16: Pulled public folder out of client and into the root folder. 
    Server:
        - 4-13: Started to add a function to add on ingredients, but pending finishing it and usage of it.
        - 5-2: Added query processing to delete images based on picture id.
        - 5-3: Added a route on userRouter to receive the username based on id.
        - 5-8: In userModel, placed profanity filter to validate username, email, and name. In recipeModel, put the profanity filter in title, measurement, item, and instructions. 










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
