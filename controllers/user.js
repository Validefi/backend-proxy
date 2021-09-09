const pool = require('../db');
const { checkErrors, validWalletAddress } = require('../middleware/validate');

const registerUser = async (req, res) => {
  checkErrors(req, (err, message) => {
    if (err) {
      return res.status(422).json({ err, message });
    }
  });
  try {
    const { address } = req.body;

    if (!validWalletAddress(address)) {
      return res.json({
        err: true,
        message: 'Wallet address not supported. Please try another one.',
      });
    }

    // await pool.query(
    //   'UPDATE MONITOR SET address = $1 WHERE user_address = $2',
    //   [address, req.user.address]
    // );

    res.json({
      err: false,
      message: 'User registered',
      // username: updateUsername.rows[0].user_name,
    });
  } catch (err) {
    res.json({
      err: true,
      message: 'Something went wrong. Please try again later',
    });
  }
};

module.exports = {
  registerUser,
};
