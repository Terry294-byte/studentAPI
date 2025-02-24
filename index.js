const express = require('express');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

const routes = require('./Routes/StudentRoute');

// Add express.json() middleware to parse JSON requests
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 4000, function() {
    console.log('Now listening for requests on :http://localhost:' + (process.env.PORT || 4000));
});