const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
firstname: {
    type: String,
    required: [true,'First name is required']
},

lastname: {
    type: String,
    required: [true,'Last name is required']

},
gender:{
    type: String,
    
}



});
const lecture =mongoose.model('lecturer',lecturerSchema)

;

module.exports = lecture;