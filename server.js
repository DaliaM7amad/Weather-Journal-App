// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup server
// Callback function for debugging
const port = 8000;
const server = app.listen(port, ()=>{console.log(`Connected on port : ${port}`)});

/* Initialize routes */

// POST Route
app.post('/postData',(request,respond)=>{
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        feel:request.body.feel
    }
    respond.send(projectData)
    console.log(projectData)   
});

// GET Route
app.get('/getData',(request,respond)=>{
    respond.send(projectData);
});

