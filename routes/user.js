const router = require('express').Router();
const { body } = require('express-validator');
const { wallet, registerUser } = require('../controllers/user');

router.post(
  '/register',
  body('address')
    .notEmpty()
    .withMessage('Please provide a valid wallet address'),
  registerUser
);

router.post(
  '/wallet',
  body('address')
    .notEmpty()
    .withMessage('Please provide a valid wallet address'),
  wallet
);

module.exports = router;
