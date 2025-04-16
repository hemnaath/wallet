const { body } = require('express-validator');


exports.validateTransfer = [
    body('amount').isNumeric().withMessage('Amount must be a number').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('receiverWalletId').isMongoId().withMessage('Invalid receiver wallet ID').notEmpty().withMessage('Receiver wallet ID is required'),
];

exports.validateWithdraw = [
    body('amount').notEmpty().withMessage('Amount required').isNumeric().withMessage('Amount must be a number').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
];