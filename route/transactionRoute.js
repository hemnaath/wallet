const express = require('express');
const transactionController = require('../controller/transactionController');
const transactionValidator = require('../validator/transactionValidator');
const passport = require('../middleware/authenticate');

const router = express.Router();
const authenticateUser = passport.authenticate("jwt", { session: false });


router.post('/transfer', authenticateUser, transactionValidator.validateTransfer, transactionController.transfer);
router.post('/withdraw', authenticateUser, transactionValidator.validateWithdraw, transactionController.withdraw);


module.exports = router;