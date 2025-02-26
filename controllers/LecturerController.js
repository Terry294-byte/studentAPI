const { default: mongoose } = require('mongoose');
const Lecture = require('../Models/Lectures');
const createError = require('http-errors');

module.exports = {
    getAllLectures: async(req, res, next) => {
        try {
            const result = await Lecture.find({});
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    
    getLecture: async(req, res, next) => {
        const id = req.params.id;
        try {
            const lecture = await Lecture.findById(id);
            if(!lecture) {
                throw(createError(404, 'Lecture not found'));
            }
            res.send(lecture);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid lecture id'));
                return;
            }
            next(error);
        }
    },
    
    addLecture: async(req, res, next) => {
        try {
            const lecture = new Lecture(req.body);
            const result = await lecture.save();
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    
    updateLecture: async(req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = {new: true};
            const result = await Lecture.findByIdAndUpdate(id, update, options);
            if(!result) {
                throw(createError(404, 'Lecture not found'));
            }
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid lecture id'));
            }
            next(error);
        }
    },
    
    deleteLecture: async(req, res, next) => {
        const id = req.params.id;
        try {
            const lecture = await Lecture.findByIdAndDelete(id);
            if(!lecture) {
                throw(createError(404, 'Lecture does not exist'));
            }
            res.send(lecture);
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid lecture id'));
                return;
            }
            next(error);
        }
    }
};