const Wallet = require('../model/walletModel');
const User = require('../model/userModel');
const { validationResult } = require('express-validator');


exports.getBalance = async (req, res) => {
    try {
        const userData = await User.findById(req.user.id);
        const walletData = await Wallet.findById(userData.wallet_id);
        LOG.info('Balance retrieved successfully', { balance: walletData.balance }, res, true, 200);
    } catch (error) {
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}

exports.addBalance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return LOG.info("Validation failed", { errors: errors.array()[0].msg }, res, false, 200);
    const { amount } = req.body;
    try{
        const userData = await User.findById(req.user.id);
        const wallet = await Wallet.findById(userData.wallet_id);
        wallet.balance += amount;
        await wallet.save();
        LOG.info('Balance added successfully', { balance: wallet.balance }, res, true, 200);
    }catch(error){
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}