//This examples shows the use of a built-in middleware that serves as a static webserver
//The static webserver is useful for files such as css, js, images, etc.

//Include the express module and create the app
var express = require('express');
var app = express();

//Define the middleware for the static webserver
//To use a middleware we pass it to the app.use function
//The express.static middleware accepts the absolute path to the folder containing static files
app.use(express.static(__dirname + '/files/ex4/public'));

//If the static folder contains a file named "index.html" this will be server automatically as the homepage route
/*
 ** This means that the following route will not be server unless:
 ** a) We erase the index.html file from the static folder
 ** b) We move the homepage route before the express.static middleware, so that it is taken into account before
 */
app.get("/", function (request, response) {
    response.send("I will not be shown unless you change something!");
});

//You can mixin dynamic routes if they do not clash with a static filename
app.get("/contacts.html", function (request, response) {
    var email = "myemail@stic-webmaster-express-essentials.io";
    response.send('I am a dynamic route. Go back to the <a href="/">Homepage</a>');
});

//Launch the webserver
app.listen(3000, console.log("Server listening at port 3000"));
