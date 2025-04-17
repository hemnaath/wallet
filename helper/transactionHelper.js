const Transaction = require('../model/transactionModel');
require('dotenv').config();


exports.getTodayTotalTransactions = async (walletId) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const transactions = await Transaction.aggregate([
        {
            $match: {
                sender_wallet_id: walletId,
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);
    return transactions[0]?.total || 0;
};

exports.isSuspiciousActivity = async (walletId, amount) => {

    const maxValue = Number(process.env.MAX_VALUE);
    const timeInterval = Number(process.env.TIME_INTERVAL);
    const maxTransaction = Number(process.env.MAX_TRANSACTIONS);

    if (amount < maxValue) return false;
    const windowStart = new Date(Date.now() - timeInterval * 60 * 1000);
    const recentHighTxns = await Transaction.find({sender_wallet_id: walletId,amount: { $gte: maxValue },
        createdAt: { $gte: windowStart }}).countDocuments();
    return recentHighTxns >= maxTransaction;
};
