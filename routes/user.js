const router = require('express').Router();
const { body } = require('express-validator');
const { wallet } = require('../controllers/user');

router.put(
  '/wallet',
  body('wallet_address')
    .notEmpty()
    .withMessage('Please provide a valid wallet address'),
  wallet
);

module.exports = router;
