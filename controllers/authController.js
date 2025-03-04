const User = require("../Models/authModel");
const {authSchema} = require("../helpers/validationSchema");
const {signAccessToken,signRefreshToken} = require('../helpers/jwtHelper');
module.exports = {
    register: async (req, res, next) => {
        try {
            // Validate user input
            const result = await authSchema.validateAsync(req.body);
    
            // Extract email from result
            const { email } = result; // ✅ Fix: Define email
    
            // Check if user already exists
            const Exists = await User.findOne({ email });
    
            if (Exists) throw createError.Conflict(`${email} is already registered`);
    
            // Create a new user
            const user = new User(result);
            const savedUser = await user.save();
    
            res.status(201).json(savedUser);
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
     ,
login: async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({email: result.email});
        if (!user) throw createError.NotFound('User not found');

        // matching the password
        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('username/password not valid');

        // if password match then generate token
    const accessToken = await signAccessToken(user.id);
 const refreshToken = await signRefreshToken(user.id);

     res.send({accessToken, refreshToken});
     } 
    catch (error) {
        console.log(error.message);
        if (error.isJoi === true) 
            return next(createError.BadRequest('invalid username/password'));
        next(error);
    }
}}