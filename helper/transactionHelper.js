const Transaction = require('../model/transactionModel');


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
