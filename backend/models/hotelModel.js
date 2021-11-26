const mongoose = require('mongoose');
const slugify = require('slugify');
//const User = require('./userModel');
//const validator = require('validator');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have a name.'],
        unique: true,
        trim: true,
        maxlength: [40, 'A hotel name must have less or equal than 40 character'],
        minlength: [10, 'A hotel name must have more or equal than 10 character']
        //validate: [validator.isAlpha, 'hotel name must only contaim characters']
    },
    slug: String,
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 4.6666, 47, 4.7
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    miniprice: {
        type: Number,
        required: [true, 'A hotel must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
        validator: function(val) {
            // THIS ONLY POINTS TO CURRENT DOC
            return val < this.price; 
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    about: {
        type: String,
        trim: true,
        required: [true, 'A hotel must have a summary']
    },
    category: {
        type: String,
        required: [true, 'Please select category for this service'],
        enum: {
            values: [
                'hotel',
                'shotlet'
            ],
            message: 'Please check and enter correct category for service entry'
        }
    },
    basicPlanPrice: {
        type: Number,
        required: [true, 'A hotel must have a price']
    },
    standardPlanPrice: {
        type: Number,
        required: [true, 'A hotel must have a price']
    },
    premiunPlanPrice: {
        type: Number,
        required: [true, 'A hotel must have a price']
    },
    basicPlanAbout: {
        type: String,
        required: [true, 'A basicPlanAbout must have a about']
    },
    standardPlanAbout: {
        type: String,
        required: [true, 'A standardPlanAbout must have a about']
    },
    premiunPlanAbout: {
        type: String,
        required: [true, 'A premiunPlanAbout must have a about']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    establishDate: [Date],
    location: {
        //Geo
        type: {
            type: String,
            depault: 'Point',
            enum: ['Point']
        }
        
    },
    coordinates: [Number],
    address: String,
    description: String,
    guides: [
        { 
            type: mongoose.Schema.ObjectId,
            ref: 'User' 
         }
    ]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

// hotelSchema.index({ price: 1 });
hotelSchema.index({ price: 1, ratingsAverage: -1 });
hotelSchema.index({ slug: 1 });
hotelSchema.index({ startLocation: '2dsphere' })

// hotelSchema.virtual('durationWeeks').get(function() {
//     return this.duration / 7;
// });

// Vitual populate
hotelSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'hotel',
    localField: '_id'
})



// DOCUMENT MIDDLEWARE: Runs before .save() and creata()
hotelSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// hotelSchema.pre('save', function(next) {
//     const guidesPromise = this.guides.map( async id => await User.findById(id));
//     this.guide = await Promise.all(guidesPromise)
//     next();
// });

//  query middleware
// hotelSchema.pre(/^find/, function(next) {
// //hotelSchema.pre('find', function(next) {
//     this.find({ secrethotel: {  $ne: true } });

//     this.start = Date.now();
//     next();
// });

hotelSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    });
    next();
});

// hotelSchema.post(/^find/, function(docs, next) {
//         console.log(`Query took ${Date.now() - this.start} miiliseconds!`)
//        //console.log(docs);
//         next();
// });

// aggregate middleware
// hotelSchema.pre('aggregate', function(next) {
//     this.pipeline().unshift({ $macth: { secrethotel: { $ne: true } } });
//     console.log(this);
//     next();
// });


const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;