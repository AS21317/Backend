const joi = require('joi');
const studentRegisterSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    branch: joi.string().min(1).max(30).required(),
    year: joi.number().min(1).max(4).required(),
    rollno: joi.string().min(1).max(9999).required(),
    email: joi.string().min(4).max(30).required().email(),
    password: joi.string().min(6).max(30).required(),
    phone: joi.number().min(1000000000).max(9999999999).required(),
});

const studentLoginSchema = joi.object({
    email: joi.string().min(4).max(30).required().email(),
    password: joi.string().min(6).max(30).required(),
});

module.exports = {
    studentRegisterSchema,
    studentLoginSchema
};