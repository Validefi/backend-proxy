const router = require('express').Router();
const { body } = require('express-validator');
const { registerUser } = require('../controllers/user');

router.post(
  '/register',
  body('address').notEmpty().withMessage('Please provide wallet address'),
  registerUser
);

module.exports = router;
