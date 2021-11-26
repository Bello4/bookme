import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { newBookingReducer, myBookingsReducer, bookingDetailsReducer, allBookingsReducer, bookingReducer } from './reducers/bookingReducer'
import { hotelReducer, hotelDetailsReducer, hotelsReducer, newHotelReducer, productReviewsReducer, reviewReducer } from './reducers/hotelReducer';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';


const reducer = combineReducers({
    hotels: hotelReducer,
    hotelDetails: hotelDetailsReducer,
    hotel: hotelsReducer,
    newHotel: newHotelReducer,
    auth: authReducer,
    user: userReducer,
    allReviews: productReviewsReducer,
    review: reviewReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    newBooking: newBookingReducer,
    myBookings: myBookingsReducer,
    allBookings: allBookingsReducer,
    bookingDetails: bookingDetailsReducer,
    booking: bookingReducer
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;