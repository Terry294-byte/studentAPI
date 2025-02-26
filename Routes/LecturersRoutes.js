const express =require(
    'express');
    
const LecturerController = require('../controllers/LecturerController');

    const routes = express.Router();
    //get a list of lecturers from the database
    routes.get('/getlecturers',LecturerController.getAllLecturers);
//add a lecturer to the database

routes.post('/addLecturer',LecturerController.addLecturer);

//update a Lecturer in the database

routes.patch('/updateStudent/:id',LecturerController.updateLecturer);

//get a lecturer by id

routes.get('/getLecturer/:id',LecturerController.getStudent);

//delete a lecturer from the database

routes.delete('/deleteLecturer/:id',LecturerController.deleteStudent);
module.exports = routes;