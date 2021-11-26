// review / rating / createdAt / ref to tour / ref to user

const mongoose = require('mongoose');
const Hotel = require('./hotelModel');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a hotel.']
    },
    hotel: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: [true, 'Review must belong to a hotel.']
    }
    

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);


reviewSchema.index({ hotel: 1, user: 1 }, { unique: true })


// POPULATING IMAGE AND NAME OF USER THAT CREATED REVIEW
reviewSchema.pre(/^find/, function(next) {
    // this.populate({
    //     path: 'hotel',
    //     select: 'name'
    // }).populate({
    //     path: 'user',
    //     select: 'name avatar'
    // });

    this.populate({
        path: 'user',
        select: 'name avatar'
    });
    next();
});

// CALCULATING RATINGS USING MONGOSE
reviewSchema.statics.calcAverageRatings = async function(hotelId) {
    
   const stats = await this.aggregate([
        {
            $match: {hotel: hotelId }
        },
        {
            $group: {
                _id: '$hotel',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    console.log(stats);

    if (stats.length > 0) {
        await Hotel.findByIdAndUpdate(hotelId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Hotel.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
    
};

reviewSchema.post('save', function() {
    // this points to current review

    this.constructor.calcAverageRatings(this.hotel);
    
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    //console.log(this.r);
    next();
});

reviewSchema.pre(/^findOneAnd/, async function() {
    // this.r = await this.findOne(); cannot work here query has already been exicuted
    await this.r.constructor.calcAverageRatings(this.r.hotel);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;