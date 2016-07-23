[![Stories in Ready](https://badge.waffle.io/Green-X/green-x.png?label=ready&title=Ready)](https://waffle.io/Green-X/green-x)
# green-x
#iGrow

##Introduction:

iGrow is a web/mobile application designed for people who like to grow their own plants, it is suitable for beginners who started growing plants and need to watch them and take care of them. In this app the users create their own gardens and add plants to it where they get information about watering, sun exposure, blooming times and more for each type of plant in their garden. Also the user has the option to add a new plant if it wasn't one of the app listed plants, the user can enter all needed data of the new plant and add it to the database and it would be available to all users, this option will provide variety of plants for users to add to their gardens.
This app was created to encourage people for growing plants by themselves, give them an easy solution to take care of their plants and provide suitable circumstances for them to grow.

##Technical Details:

This app was built using the MEAN stack (MongoDB , Express.js, Angular.js and Node.js). It has options for users to create an account, browse plants, create their own gardens and add or remove plants from their gardens.

###BackEnd:

1. Configuration files (server/config)
    - helpers.js: To handle errors and decode requests
    - middleware.js: middleware pipes to modify requests
    - routes.js: handles routing
    - utils: TODO
1. Plants Database files (server/plants)
   	- plantsController.js: Controls plants model for fetching all plants and adding a new plant
    - plantsModel: define plant schemas
1. Users Database files (server/plants)
   	- usersController.js: Controls users model:
   		- signs users in
   		- signs users up
   		- checks for authenticated users
   		- adds plant to user garden
   		- removes plant from users garden
   		- views user's garden
    - usersModel: define users schemas
1. Server and database connection: Where all the magic starts

###FrontEnd (public):
Front is built using Angular, it uses bootstrap for styling and CSS. JQuery and Bootstrap Javascript are used along with angular to control views.
The page is divided into the following views:
1. Authentication: Signin and Signup pages
1. Browse all plants view which contains an expandable card for each plant
1. Garden view, same as browse all, except it does not contain a search field, and only shows plants for the user.
1. Create plant view: used to create a new plant, the image field must be a url for an image (e.g. jpg, png, jpeg, etc). TODO: make the create plant view handle uploads from the computer.
1. Services: to handle http requests and communications with the server.
1. Application: to handle routing between pages, checks for authentication, and intercepts connections to attach tokens.

##Test:
1. No tests were written. TODO: Write tests in mocha to check functionality of backend and front end
1. For now, user experience testing was done to check functionality of app.

## Basic requirements

### Prep work

Before we get started, there is some prep work we need to complete. Mainly getting a Heroku account and installing the
Heroku CLI toolbetl.

 * [ ] Create a [Heroku](https://www.heroku.com/) account
 * [ ] Install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

### Setup your application for Deployment

Running an application on a third-party host like Heroku isn't the same as running it locally. The most common 
difference you'll notice immediately is what port the server runs on. This section will help you prepare your 
application for deployment on Heroku.

 * [ ] Run the application locally and make sure it still works

### Deploy your application

We're ready to deploy! Create a Heroku application and deploy your application's code to it. 

 * [ ] [Create a Heroku application](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app) for green-x
 * [ ] [Deploy](https://devcenter.heroku.com/articles/getting-started-with-nodejs#push-local-changes) your application to your new Heroku endpoint
 * [ ] Make sure the application works on Heroku, take it for a test spin!

## Extra Credit
### Functionality:
 * [ ] Allow users to view each other's gardens, add comments, shares, likes, and reviews
 * [ ] Use an API to recognise plants by names and add them automatically
 * [ ] Make privileged user access, which means admins and users.
 * [ ] Make a view to load gardening related tools, trees, etc for sale from local or nearby stores
 * [ ] Allow map view of nearby stores, gardens, etc.
 * [ ] View images in a google images like manner.

##Future Work:
There are different ideas to modify and add for this app like adding options for users to connect with each other (forum) to share images of their gardens, experiences and recommendations. Also, adding an option to show nearby stores where users can find the plants they are looking for. Currently the app is designed to be a web app but in future it can be designed to work as mobile app.
