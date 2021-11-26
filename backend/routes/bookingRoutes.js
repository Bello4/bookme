const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

// PROTECTIN ALL BOOKING ROUTES FROM STARGERS
router.use(authController.protect);


//router.use(authController.restrictTo('user'));
router.get('/me', bookingController.getMyBooking)
router.post('/new', bookingController.newBooking);
router
  .route('/admin')
  .get(authController.restrictTo('admin'), bookingController.getAllBookings)
  

router.get('/:id', authController.restrictTo('admin'), bookingController.getBooking)

//getBooking
router
  .route('/admim/:id')
  .patch(authController.restrictTo('admin'), bookingController.updateBooking)
  .delete(authController.restrictTo('admin'), bookingController.deleteBooking);


module.exports = router;