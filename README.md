# Recipe Project

This full-stack project based on the MERN stack, which consists of MongoDB, Express, React, and Node. It also utilizes Mongoose, Redux, Webpack, and SCSS. The website can be used to create accounts, profiles, submit recipes, view others' recipes & profiles, or view recipes using spoonacular's API by searching. The website is also formatted to be able to use on both mobile and desktop screen sizes.

[View the website here](https://jd1715-recipe-project.herokuapp.com/)


## Client-side
* Created with React, ReactDOM, React Router, Redux, and React-Redux.
* The index checks for a locally stored token, checks it with the server, then renders the app.
* The AppRouter includes React lazy loading pages, public routes, private routes for only users who are logged in. If they're not logged in, it'll redirect them to the homepage if they attempt to load a user page.
* The Redux store includes all reducers, logger and thunk middleware, and ability to use a browser extension to view the store.
* The components use React hooks such as useState and useEffect, Redux hooks such as useDispatch to dispatch actions to the store, useSelector for access to reducers, react-router-dom hooks such as useLocation to get information off the URL, and useHistory to push to other pages.
* Reused components are ones such as PopulateRecipes, RecipeForm, LeftColumn, and RightColumn.
* React-redux-loading-bar is used throughout to display a loading of information. There's also a loading message while going between routes that are being downloaded.

### Navigation Components
* The navigation features two nav rows on desktop with logo, links, search, log in, log out, create account, buttons that are disabled unless the user is logged in by checking the reducer.
* On a smaller screen, the nav is shrunk down to one nav row to include the logo, search, and a popout menu. The popout menu will change the Account side buttons based on whether a use is logged in or not.
* Pop up modals are used for when a user creates an account or signs in.
* Error handling is used and displayed to the user if the email, username, etc is already taken, if it has profanity, or if the login information is incorrect or does not fit the format.
* Users are pushed to the home page after they log out.
* Search uses spoonacular API then uses PopulateRecipe component to fill in the results to the user.

### Home/Public Components
* AllRecipesPage gets all user created recipes and fills it in with the PopulateRecipes component to display to the user. It also uses the processUsernames utility to get all usernames for the recipes then passes it to PopulateRecipes.
* ConversionPage is designed to be a very simple page displaying essential recipe measurements.
* PopulateRecipe component takes in props of a list of recipes and their information. Depending on what the information is, the component will display the recipes passed to it in a grid form.
* RecipeRoulette features randomized recipes from spoonacular API with transition effects.
* SearchResultsPage takes in the parameter based on the URL, sets the key for the API, and then searches spoonacular. The recipe results are then passed to PopulateRecipes.
* UserProfilePage includes LeftColumn and RightColumn components to display userinfo. It uses location to grab the id of the user, retrieves it from the server, then displays it on the page.
* The LeftColumn and RightColumn are passed isPublic={ true } to show that the user profile is a public one in order to hide certain information or other things.
* ViewRecipePage will take in either a user-submitted recipe or a spoonacular recipe, then decide which information to display. If it's a spoonacular recipe, the URL will contain ?type=spoon. Both will have the recipe id in the URL and then the id will be taken off of it and used to display which recipe. The page features a gallery slideshow to display images, clickable link to the user profile on their username, and a source link if it is a spoonacular recipe.

### User Components
* The EditRecipePage and SubmitRecipePage both use the same RecipeForm component. If it's a new recipe, information will be cleared and a user can fill in the information. If a user is editing a recipe, the recipe information will be filled in so they can see the current information and modify it.
* RecipeForm includes error handling in case something isn't filled out or profanity is detected. A user can add and delete ingredients with ease using state changing.
* The LeftColumn and RightColumn components are reused on a public profile and on MyAccount and MyRecipes page to display icon, recent links, user information, and a link to view their profile. Depending on the size of the screen, the sides will adapt or become hidden. Email information and view profile link is not on public page, only in a user's pages.
* MyRecipesPage includes a list of a user's recipes that they have submitted with the options to view them, edit, delete, and modify the pictures per recipe. A pop up modal is used for confirming deletion of a recipe and for modifying the recipe pictures by deleting or uploading them. A user can upload up to five images at a time.
* MyAccountPage includes the left and right columns, links to /myrecipes and /submitrecipe as well as the usual account settings
- * The buttons in My Account include Upload or modify user icon, Change my username, Change my email, Set a new password, Modify my name, Log out of all locations, and Delete my account. 
- * For each button, a modal opens displaying the current data and then a user can change their info for each. It also handles errors per modal as well.
- * If they log out of all locations, then all tokens will be wiped, and the user will be redirected to the homepage.
- * If they wish to delete their account, they must confirm by typing in their current username then hitting delete.
- * Setting a new password requires the user to put in the old password, the new password, and to verify the new password. The checkboxes on the side will reveal what a user has typed in them if they need to view the field since passwords are hidden when typed.

### Store & Redux
* There are seven sets of action & reducers.
* The account handles login, logout, getting the user, updating, getting the icon, and deleting the icon.
* All Recipes will handle all user recipes, recipe usernames, and search results.
* Recipe roulette handles the randomized set of recipe cards on the homepage using the API.
* Selected recipe is for individual recipes. It used for viewing a recipe on a page and edit a recipe.
* Server error is where the server errors are stored in order to display them to the user as they come about.
* User profile holds all the profile stuff. It holds the profile recipes and the user info that one is viewing.
* User recipes is used to submit a new recipe, hold the current user's recipes, and delete a recipe.

### Database & Utils




### Efficiency
* AllRecipes, a user's MyRecipes, UserProfilePage, and RecipeRoulette are all stored after the initial request so that if the components reload, it will use the local information instead of retrieving the data from the server again. This will save network traffic.
* If a user edits or submits a new recipe, then MyRecipes will be reloaded.
* If a user hits the "spin" button on RecipeRoulette, then a new set of random recipes will load.


## Server-side features
* Created with Nodejs, Express, MongoDB, Mongoose.
* Authentication middleware for users, their accounts, and their recipes.
* Passwords are hashed with bcrypt and all data is stored in a MongoDB cluster.
* The two mongoose models, userModel and recipeModel, are linked together. Both check for profanity in users and recipes.
* Validation checker for proper email, password, username, etc.
* Login tokens to be created, deleted, and used for storing login sessions.
* Both routers have CRUD for creating, reading, updating, and deleting numerous things in the user account or their recipes.
* User icons and up to five pictures per recipe.
* Modules used are bad-words, bcryptjs, express, jsonwebtoken, mongodb, mongoose, multer, sharp, and validator.