const { body } = require('express-validator');

exports.validateAddBalance = [
    body('amount').isNumeric().withMessage('Amount must be a number').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
];