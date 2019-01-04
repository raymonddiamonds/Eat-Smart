// ./express-server/app.js
//Run node app.js to turn on server 

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
var path = require('path');

//middleware: allows us to read data from <form> elements (i.e. when POSTing)
var bodyparser = require('body-parser');

//creates our express application, we call it app
var app = express();

//const pantry = require('models/pantry');
//ES6 Promises
//connect to the server: 

//Mongoose -> connects to MongoDB
//Establish connection with server
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/smeart',{ useNewUrlParser: true });

mongoose.connection.once('open',function(){
	console.log('Connection has been made to port 27017');
}).on('error',function(error)
{
	console.log('Connection error: ',error);
}); //on checks every error that occurs
//


//Express stuff
const port = process.env.PORT || 3001;
const route = require('./routes/pantry-route');
const route2 = require('./routes/wallet-route');
const authRoute = require('./routes/auth-route');

app.use(cors());
app.use(bodyparser.json());
//defines the path of the folder
app.use(express.static(path.join(__dirname,'public')));
//Listen in to ports and route the requests
//This is serving the database (?)
app.get('/', (req, res) => {
    res.send('Hello Express'); //sends the message to the server root
});

app.use('/pantry', route);
app.use('/wallet', route2);

//AUTH CONFIG
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.use(require("express-session")({
    secret: "data in the session is encoded and decoded using this key", 
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/authenticate', authRoute);

// start listening to the port
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});

//Connecting Express to React app - Anthony

//create a GET route for React app to communicate with
//we will fetch this within our client-side React
app.get('/express-backend', (req, res) => {
  res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!'});
});


