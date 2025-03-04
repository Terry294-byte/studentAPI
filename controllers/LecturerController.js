const { default: mongoose } = require('mongoose');
const Lecturer = require('../Models/Lecturer');
const createError = require('http-errors');

module.exports = {
    getAllLecturers: async(req, res, next) => {
        try {
            const result = await Lecturer.find({});
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    
    getLecturer: async(req, res, next) => {
        const id = req.params.id;
        try {
            const lecturer = await Lecturer.findById(id);
            if(!lecturer) {
                throw(createError(404, 'Lecturer not found'));
            }
            res.send(lecturer);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid lecturer id'));
                return;
                
            }
            next(error);
        }
    },
    
    addLecturer: async(req, res, next) => {
        try {
            const lecturer = new Lecturer(req.body);
            const result = await lecturer.save();
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    
    updateLecturer: async(req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = {new: true};
            const result = await Lecturer.findByIdAndUpdate(id, update, options);
            if(!result) {
                throw(createError(404, 'Lecturer not found'));
            }
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid lecturer id'));
            }
            next(error);
        }
    },
    
    deleteLecturer: async(req, res, next) => {
        const id = req.params.id;
        try {
            const lecturer = await Lecturer.findByIdAndDelete(id);
            if(!lecturer) {
                throw(createError(404, 'Lecturer does not exist'));
            }
            res.send(lecturer);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid lecturer id'));
                return;
            }
            next(error);
        }
    }
};