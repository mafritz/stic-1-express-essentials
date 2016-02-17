//Include the express module and create the app
var express = require('express');
var app = express();

//Include the template module that must be installed with npm install ejs
//There are different template engines (e.g. jade), in this case we use ejs --> http://www.embeddedjs.com/
var jade = require('jade');

//Define the folder where templates are stored
app.set('views', './files/ex6/views');
//Define the template engine
app.set('view engine', 'jade');

//Define the route for the homepage
app.get("/", function (request, response) {
    //Define two variables to pass to the view
    var title = 'My homepage';
    var message = 'Welcome to my Homepage!!';
    //Render the homepage.jade view and pass the two variables to it
    response.render('homepage.jade', {
        title: title,
        message: message
    });
});

//Listen to port 3000
app.listen(3000, console.log("Server listening to port 3000"));
