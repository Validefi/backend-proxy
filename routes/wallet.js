const router = require('express').Router();
const { body } = require('express-validator');
const { monitorWallet } = require('../controllers/user');

router.post(
  '/monitor',
  body('address').notEmpty().withMessage('Please provide wallet address'),
  monitorWallet
);

module.exports = router;