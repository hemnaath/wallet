const Wallet = require('../model/walletModel');
const User = require('../model/userModel');


exports.getBalance = async (req, res) => {
    try {
        const userData = await User.findById(req.user.id);
        const walletData = await Wallet.findById(userData.wallet_id);
        LOG.info('Balance retrieved successfully', { balance: walletData.balance }, res, true, 200);
    } catch (error) {
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}