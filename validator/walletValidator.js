const { body } = require('express-validator');

exports.validateAddBalance = [
    body('amount').isNumeric().withMessage('Amount must be a number').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
];

exports.validateConvertCurrency = [
    body('amount').isNumeric().withMessage('Amount must be a number').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('fromCurrency').notEmpty().withMessage('From currency is required'),
    body('toCurrency').notEmpty().withMessage('To currency is required'),
];