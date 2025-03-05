const express =require(
    'express');
    const routes = express.Router();
    const StudentController = require('../controllers/StudentController');
    const { verifyAccessToken } = require('../helpers/jwtHelper');

    //get a list of students from the database
    routes.get('/getstudents',verifyAccessToken,StudentController.getAllStudents);
//add a student to the database

routes.post('/addStudent',StudentController.AddStudent);

//update a student in the database

routes.patch('/updateStudent/:id',StudentController.updateStudent);

//get a student by id

routes.get('/getStudent/:id',StudentController.getStudent);

//delete a student from the database

routes.delete('/deleteStudent/:id',StudentController.deleteStudent);
module.exports = routes;