const express = require('express');
const router = express.Router();

const LecturerController = require('../controllers/LecturerController');

// Get all lecturers
router.get('/getlecturers', LecturerController.getAllLecturers);

// Get a single lecturer by ID
router.get('/getlecturer/:id', LecturerController.getLecturer);

// Create a new lecturer
router.post('/addlecturer', LecturerController.addLecturer);

// Update a lecturer
router.patch('/updatelecturer/:id', LecturerController.updateLecturer);

// Delete a lecturer
router.delete('/deletelecturer/:id', LecturerController.deleteLecturer);

module.exports = router;