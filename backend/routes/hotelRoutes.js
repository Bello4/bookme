const express = require('express');
const hotelController = require('./../controllers/hotelController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// reviews should be made under a tour tour and also be see
// e.i POST /tour/234fad4/reviews
// e.i GET /tour/234fad4/reviews
// e.i GET /tour/234fad4/reviews/94888gh4

// router.route('/:tourId/reviews')
// .post(
//     authController.protect, 
//     authController.restrictTo('user'), 
//     reviewController.createReview
//     );

router.use('/:hotelId/reviews', reviewRouter);

// ROUTE TO GET HOTEL WITHIN SOON TO BE USED
router.route('/hotel-within/:distance/center/:latlng/unit/:unit').get(hotelController.getHotelsWithin);

// ROUTE TO GET HOTEL DISTANCE SOON TO BE USED
router.route('/distances/:latlng/unit/:unit').get(hotelController.getDistances);

router
  .route('/newhotels')
  .get(hotelController.getAllHotelsData)
router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(authController.protect, authController.restrictTo('admin', 'guides'), hotelController.createHotel);

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(authController.protect, authController.restrictTo('admin', 'guides'), hotelController.updateHotel)
  .delete(authController.protect, authController.restrictTo('admin', 'guides'), hotelController.deleteHotel
  );



module.exports = router;
