const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the application. Contains different dbs. Organize and keep track of all your notes. Organise the products and company of products."});
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/products.routes.js')(app);
require('./app/routes/companies.routes.js')(app);
// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});