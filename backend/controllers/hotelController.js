const Hotel = require('./../models/hotelModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const cloudinary = require('cloudinary');



exports.aliasTopHotels = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,miniprice,ratingsAverage,summary,';
  next();
};

//CREATING NEW HOTEL DATA
exports.createHotel = catchAsync(async (req, res, next) => {

  let images = []
  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }
  
  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products'
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
      })
  }
  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const hotels = await Hotel.create(req.body);

  res.status(201).json({
    status: 'success',
    hotels
  })
});



//UPDATING HOTEL DATA
exports.updateHotel = catchAsync(async (req, res, next) => {

  let hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
      return next(new AppError('hotel not found', 404));
  }

  let images = []
  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }

  if (images !== undefined) {

      // Deleting images associated with the product
      for (let i = 0; i < hotel.images.length; i++) {
          const result = await cloudinary.v2.uploader.destroy(hotel.images[i].public_id)
      }

      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'products'
          });

          imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url
          })
      }

      req.body.images = imagesLinks

  }



  hotels = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  });

  res.status(200).json({
    status: 'success',
    hotels
  })

})


//GETTING ALL HOTEL DATA I.E PAGINATION, SORTING, FILTERING,
exports.getAllHotelsData = catchAsync(async (req, res, next) => {

     const resPerPage = 3;
     const hotelCounts = await Hotel.countDocuments();
    
    const features = new APIFeatures(Hotel.find(), req.query)
      .filter()
      .search()
      .paginate(resPerPage)

      let hotels = await features.query;
      // let filterHotelCount = hotels.length;

      //  features.paginate(resPerPage)
      //  hotels = await features.query;

      
    // const doc = await features.query.explain();
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: hotels.length,
      hotels,
      hotelCounts,
      resPerPage
      
      
      // filterHotelCount,
      // resPerPage
      
    });

});


// GETTING SINGLE HOTEL
exports.getHotel = catchAsync(async (req, res, next) => {
  
  // POPULATING HOTEL REVIEWS
  let query = Hotel.findById(req.params.id).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  //if (popOptions) query = query.populate(popOptions);
  
  const hotel = await query;
  
  if (!hotel) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    hotel
  });

});

// REFRACTURED CONTROLLER
exports.getAllHotels = factory.getAll(Hotel);
exports.deleteHotel = factory.deleteOne(Hotel);

//GETTING STATICSTICS
exports.getHotelStats = catchAsync(async (req, res, next) => {
    const stats = await Hotel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numHotels: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });

});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021

    const plan = await Hotel.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numHotelStarts: { $sum: 1 },
          hotels: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numHotelStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
});


//GEO LOCATION QUERYING
exports.getHotelsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const hotels = await Hotel.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: hotels.length,
    data: {
      data: hotels
    }
  });
});


exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Hotel.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});