const express =require(
    'express');

    const routes = express.Router();
    //get a list of students from the database
    routes.post('/students', (req, res) => {
        console.log(req.body); // This should show your student data
        // Here you would save to MongoDB
        res.send({
            type: 'Post Request',
            receivedData: req.body
        });
    });

//add a student to the database

routes.post('/students',(req, res)=>{
    res.send({type:'Post Request'});
});

//update a student in the database

routes.put('/students/:id',(req, res)=>{
    res.send({type:'Put Request'});
});

//delete a student from the database

routes.delete('/students/:id',(req, res)=>{
    res.send({type:'Delete Request'});
});

module.exports = routes;