const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: [true, 'Booking must belong to Plan']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to User']
    },
    service: {
        type: String,
        required: [true, 'Booking must belong to Plan']
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    duration: {
        type: Number
    },
    contact: {
        type: Number
    },
    location: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Booking must belong to Price']
    },
    arrival: { 
        type: Date,
        required: [true, 'Booking must have arrival date']
        
    },
    leaving: {
        type: Date,
        required: [true, 'Booking must belong to Plan']
    },
    paidAt: {
        type: Date
    }
});

// POPULATING IMAGE AND NAME OF USER THAT CREATED BOOKING

bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name avatar'
    })
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;