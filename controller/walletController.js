const Wallet = require('../model/walletModel');
const User = require('../model/userModel');
const CurrencyConverter = require('currency-converter-lt');
const { validationResult } = require('express-validator');
const axios = require('axios');


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

exports.convertCurrency = async (req, res) => {
    const { amount, fromCurrency, toCurrency } = req.body;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/b1b349ca6fa400c6b70d428a/latest/${fromCurrency}`);
        const convertedCurrency = response.data.conversion_rates[toCurrency] * amount;
        LOG.info('Currency converted', {convertedCurrency}, res, true, 200);
    } catch (error) {
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}