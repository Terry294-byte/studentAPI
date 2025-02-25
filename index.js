const express = require('express');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();




// Add express.json() middleware to parse JSON requests
app.use(express.json());
const routes = require('./Routes/StudentRoute');
app.use('/api',routes);

app.listen(process.env.PORT || 4000, function() {
    console.log('Now listening for requests on :http://localhost:' + (process.env.PORT || 4000));
});