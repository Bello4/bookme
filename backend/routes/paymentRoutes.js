const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.use(authController.protect);


router
  .route('/process')
  .post(paymentController.processPayment);
router
  .route('/stripeapi')
  .get(paymentController.sendStripApi);
  
module.exports = router;