//This examples shows how to use templates, which are useful elements to add data to pages

//Include the express module and create the app
var express = require('express');
var app = express();

//Include the template module that must be installed with npm install ejs
//There are different template engines (e.g. jade), in this case we use ejs --> http://www.embeddedjs.com/
var ejs = require('ejs');

//Define the folder where templates are stored
app.set('views', './files/ex5/views');
//Define the template engine
app.set('view engine', 'ejs');

//Define some data that will be included in the templates
var notes = [
    {
        ex: 1,
        grade: 5.75
    }, {
        ex: 2,
        grade: 5.5
    }, {
        ex: 3,
        grade: 6
    }
];

//Define a route for the homepage that uses the homepage.ejs template
app.get("/", function (request, response) {
    //Use the response.render() method, which accepts the filename of the template and an array of data to pass to it
    //In this case we pass a variable with the cours name STIC I and the notes object defined above
    //These two variables will be accessible in the template
    response.render('homepage.ejs', {
        cours: "STIC I",
        notes: notes
    });
});

//Launch the webserver
app.listen(3000, console.log("Server listening to port 3000"));
