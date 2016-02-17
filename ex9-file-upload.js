//This example shows how to upload a file through a simple HTML form using the multer module

//Inclue the express module and create the app
var express = require('express');
var app = express();

//Include the multer module, which must be installed with npm install multer
var multer = require('multer');
//Define the destination folder of the upload
var storage = multer.diskStorage({
  destination: 'files/ex9/uploads/',
  filename: function (request, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname)
  }
})

var upload = multer({ storage: storage });

//Define the homepage route with the upload file form
app.get("/", function (request, response) {
    //Send the content of the form.html page
    response.sendFile(__dirname + "/files/ex9/form.html");
});

//Handle the post route of the form with the file upload fields whose name is "myFile"
//You can use the multer upload.single('myFile') middleware to upload the file
app.post("/upload", upload.single('myFile'), function (request, response) {
    console.log(request.file);
    response.send("File uploaded!");
});

//Launch the server
app.listen(3000, console.log("Server listening to port 3000"));
