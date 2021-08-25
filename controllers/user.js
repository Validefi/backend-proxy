const pool = require('../db');
// const { validUsername } = require('../utils/regex');
const { checkErrors } = require('../middleware/validation');

const wallet = async (req, res) => {
  checkErrors(req, (err, message) => {
    if (err) {
      return res.status(422).json({ err, message });
    }
  });
  try {
    const { wallet_address } = req.body;

    // if (!validWalletAddress(wallet_address)) {
    //   return res.json({
    //     err: true,
    //     message: 'wallet_address not supported, Please try another one.',
    //   });
    // }

    await pool.query(
      'UPDATE MONITOR SET wallet_address = $1 WHERE user_address = $2',
      [wallet_address, req.user.wallet_address]
    );

    res.json({
      err: false,
      message: 'Wallet address set to monitor mode successfully.',
      username: updateUsername.rows[0].user_name,
    });
  } catch (err) {
    res.json({
      err: true,
      message: 'Something went wrong. Please try again later',
    });
  }
};

module.exports = {
  wallet,
};
