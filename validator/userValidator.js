const { body } = require('express-validator');

exports.validateRegister = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').notEmpty().withMessage('Name is required'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least 1 number')
        .matches(/[!@#$%^&*()]/).withMessage('Password must contain at least 1 special character'),
];

