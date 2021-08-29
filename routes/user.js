const router = require('express').Router();
const { body } = require('express-validator');
const { registerUser } = require('../controllers/user');

router.post(
  '/register',
  body('address')
    .notEmpty()
    .withMessage('Please provide a valid wallet address'),
  registerUser
);

module.exports = router;
