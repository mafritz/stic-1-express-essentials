var express = require('express');
//Création de l'application principale
var app = express();
//Création d'une "sous-application" avec un Router()
var admin = express.Router();

//Include the template module that must be installed with npm install ejs
//There are different template engines (e.g. jade), in this case we use ejs --> http://www.embeddedjs.com/
var jade = require('jade');

//Define the folder where templates are stored
app.set('views', './files/ex10/views');
//Define the template engine
app.set('view engine', 'jade');

//Create un undefined variable that will be modified by middlewares
var user;

//Middlewares et routes pour l'app principale
function myAppMiddleware(request, response, next) {
    user = 'Guest';
    next();
}
app.use(myAppMiddleware);

app.get("/", function (request, response) {
    response.render('homepage.jade', {
        user: user
    });
});

//Middleware et routes pour la "sous-application"
function myAdminMiddleware(request, response, next) {
    user = 'Admin';
    next();
}
admin.use(myAdminMiddleware);

admin.get("/", function (request, response) {
    response.render('admin.jade', {
        user: user
    });
});

//On ajoute la sous-application à l'app principale avec un "mount point"
app.use("/admin", admin);

//Server
app.listen(3000, console.log("Server listening at port 3000"));