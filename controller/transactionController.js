const Wallet = require('../model/walletModel');
const Transaction = require('../model/transactionModel');
const { validationResult } = require('express-validator');
require('dotenv').config();
const { getTodayTotalTransactions, isSuspiciousActivity } = require('../helper/transactionHelper');


exports.transfer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return LOG.info("Validation failed", { errors: errors.array()[0].msg }, res, false, 200);
    const { amount, receiverWalletId } = req.body;
    try{
        const walletData = await Wallet.findById(req.user.wallet_id);
        const receiverWallet = await Wallet.findById(receiverWalletId);
        if (!receiverWallet) return LOG.info('Wallet not found', null, res, false, 200);
        if (walletData.balance < amount) return LOG.info('Insufficient balance', null, res, false, 200);
        const todayTotal = await getTodayTotalTransactions(req.user.wallet_id, 'transfer');
        if ((todayTotal + amount) > Number(process.env.DAILY_TRANSACTION_LIMIT)) return LOG.info('Daily transaction limit exceeded', null, res, false, 200);
        if (await isSuspiciousActivity(req.user.wallet_id, amount)) return LOG.info('Suspicious activity detected', null, res, false, 200);
        walletData.balance -= amount;
        receiverWallet.balance += amount;
        await walletData.save();
        await receiverWallet.save();
        await Transaction.create({mode: 'transfer', amount, sender_wallet_id: req.user.wallet_id, reciever_wallet_id: receiverWalletId});
        LOG.info('Transfer successful', { senderWalletId: req.user.wallet_id, receiverWalletId }, res, true, 200);
    }catch(error){
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}

exports.withdraw = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return LOG.info("Validation failed", { errors: errors.array()[0].msg }, res, false, 200);
    const { amount } = req.body;
    try{
        const walletData = await Wallet.findById(req.user.wallet_id);
        if (!walletData) return LOG.info('Wallet not found', null, res, false, 200);
        if (walletData.balance < amount) return LOG.info('Insufficient balance', null, res, false, 200);
        const todayTotal = await getTodayTotalTransactions(req.user.wallet_id, 'transfer');
        if ((todayTotal + amount) > Number(process.env.DAILY_TRANSACTION_LIMIT)) return LOG.info('Daily transaction limit exceeded', null, res, false, 200);
        walletData.balance -= req.body.amount;
        await walletData.save();
        await Transaction.create({mode: 'withdraw', amount: req.body.amount, sender_wallet_id: req.user.wallet_id});
        LOG.info('Withdraw successful', { walletId: req.user.wallet_id }, res, true, 200);
    }catch(error){
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}

exports.getTransactionHistory = async (req, res) => {
    try{
        const transactionHistory = await Transaction.find({ sender_wallet_id: req.user.wallet_id });
        if (!transactionHistory) return LOG.info('No transaction history found', null, res, false, 200);
        LOG.info('Transaction found', { transactionHistory }, res, true, 200);
    }catch(error){
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}