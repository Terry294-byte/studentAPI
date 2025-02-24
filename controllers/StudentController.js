const Student = require('../models/student');




module.exports ={

    AddStudent: async(req,rep,next) => {
        try {
            const student = new Student(req.body)
            const result =await student.save();
            result.send(result)

        }catch (error){
            console.log(error.message);
            next(error);
        }

}}