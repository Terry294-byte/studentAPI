const express = require('express');
require('dotenv').config();
require('./helpers/init_mongodb');

const { createError } = require('http-errors');

const app = express();




// Add express.json() middleware to parse JSON requests
app.use(express.json());
const routes = require('./Routes/StudentRoute');
const routes = require('./Routes/LecturersRoutes');
app.use('/api',routes);

// Error handling 404 error
app.use(async(req, res, next)=>{
    //next(createError(404,"Not Found"));
    next(createError.NotFound());
}
);
//error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
            
        },
           
    });
});


app.listen(process.env.PORT || 4000, function() {
    console.log('Now listening for requests on :http://localhost:' + (process.env.PORT || 4000));
});