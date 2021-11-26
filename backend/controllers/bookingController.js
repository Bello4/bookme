const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

// CREAT BOOKING CONTROLLER
exports.newBooking = catchAsync(async (req, res, next) => {

  const { price, service, arrival, leaving, duration, location, contact, paymentInfo, hotelName } = req.body;
  
  const booking = await Booking.create({ paymentInfo, duration, price, service, location, contact, arrival, leaving, paidAt: Date.now(), hotelName, user: req.user._id });
  
  res.status(201).json({
    status: 'success',
    booking
  });
  
});


// GET USER BOOKINGS CONTROLLER
exports.getMyBooking = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })

    res.status(200).json({
      success: true,
      bookings
    })
});

// GET SPECIFIC BOOKING USING  BOOKING ID
exports.getBooking = catchAsync(async (req, res, next) => {
    
  const booking = await Booking.findById(req.params.id).populate('user');
  
  
  if (!booking) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    booking
  });

});

//REFRACTOR CODE FOR USAGE
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);