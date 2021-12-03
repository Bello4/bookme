const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const dotenv = require('dotenv');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const paymentRouter = require('./routes/paymentRoutes');


dotenv.config({ path: './config.env'});

const app = express();
app.enable('trust proxy');


// IMPLEMENTING CORS
app.use(cors());
app.options('*', cors());


// 1) global middleware
// // Set security headers
// app.use(helmet());
// app.use(helmet({ contentSecurityPolicy: false } ));

//Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};



// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb'}))
app.use(cookieParser());
app.use(fileUpload());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against cross side scripting attack
app.use(xss());

//custor middlewear
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
   // console.log(req.cookies);
    next();
});


//  ROUTES
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/payments', paymentRouter);


if (process.env.NODE_ENV === 'production') {

    
    app.use(express.static(path.join(__dirname, '../front/build')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../front/build/index.html'))
    })

  }



app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;