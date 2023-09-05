const router = require('express').Router();
const Student = require('../models/student');
const {studentRegisterSchema, studentLoginSchema} = require('../helpers/validationSchema');
const {signAccessToken, verifyAccessToken} = require('../helpers/jwt_helpers');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

router.post('/register', async (req, res, next) => {
    try {
        const result = await studentRegisterSchema.validateAsync(req.body);
        const doesExist = await Student.findOne({email: result.email});
        if (doesExist) throw createError.Conflict(`${result.email} is already registered`);
        const student = new Student(result);
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        const savedStudent = await student.save();
        const accessToken = await signAccessToken(savedStudent);
        //set user email in cookie
        res.cookie('email', savedStudent.email, {maxAge: 900000, httpOnly: true});
        res.send({accessToken});
    } catch (err) {
        if (err.isJoi === true) err.status = 422;
        next(err);
    }
}
);
 
router.post('/login', async (req, res, next) => {
    try {
        const result = await studentLoginSchema.validateAsync(req.body);
        const student = await Student.findOne({email: result.email});
        if (!student) throw createError.NotFound('User not registered');
        const isMatch = await bcrypt.compare(result.password, student.password);
        if (!isMatch) throw createError.Unauthorized('Username/password not valid');
        const accessToken = await signAccessToken(student);
        //set user email in cookie
        res.cookie('email', student.email, {maxAge: 900000, httpOnly: true});
        res.send({accessToken});
    } catch (err) {
        if (err.isJoi === true) return next(createError.BadRequest('Invalid Username/Password'));
        next(err);
    }
}
);


module.exports = router;
