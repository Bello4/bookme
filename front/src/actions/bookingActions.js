import axios from 'axios'


import {
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
    MY_BOOKINGS_REQUEST,
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,
    ALL_BOOKINGS_REQUEST,
    ALL_BOOKINGS_SUCCESS,
    ALL_BOOKINGS_FAIL,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_FAIL,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/bookingConstants'

// CREATING BOOKINGS
export const createBooking = (booking) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_BOOKING_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/bookings/new', booking, config)

        dispatch({
            type: CREATE_BOOKING_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get curretly logged in user orders
export const myBookings = () => async (dispatch) => {
    try {

        dispatch({ type: MY_BOOKINGS_REQUEST });

        const { data } = await axios.get('/api/v1/bookings/me')
        
        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: MY_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get Booking details.
export const getBookingDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: BOOKING_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/bookings/${id}`)

        dispatch({
            type: BOOKING_DETAILS_SUCCESS,
            payload: data.booking
        })

    } catch (error) {
        dispatch({
            type: BOOKING_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get all Bookings - ADMIN
export const allBookings = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_BOOKINGS_REQUEST });

        const { data } = await axios.get(`/api/v1/bookings/admin`)
        
        dispatch({
            type: ALL_BOOKINGS_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: ALL_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }
}



// update Booking
export const updateBooking = (id, bookingData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BOOKING_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.patch(`/api/v1/booking/admim/${id}`, bookingData, config)
        
        dispatch({
            type: UPDATE_BOOKING_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}



// Delete Booking
export const deleteBooking = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BOOKING_REQUEST })

        const { data } = await axios.delete(`/api/v1/booking/admim/${id}`)
         
        dispatch({
            type: DELETE_BOOKING_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}