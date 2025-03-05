const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ✅ Fix: Correct the function name and syntax
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);  // ✅ Fix: Corrected syntax
    } catch (error) {
        throw error;
    }
};

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
