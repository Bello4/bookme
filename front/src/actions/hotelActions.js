import axios from 'axios'

import { 
    ALL_HOTELS_REQUEST,
    ALL_HOTELS_SUCCESS,
    ALL_HOTELS_FAIL,
    ADMIN_HOTELS_REQUEST,
    ADMIN_HOTELS_SUCCESS,
    ADMIN_HOTELS_FAIL,
    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAIL,
    DELETE_HOTEL_REQUEST,
    DELETE_HOTEL_SUCCESS,
    DELETE_HOTEL_FAIL,
    UPDATE_HOTEL_REQUEST,
    UPDATE_HOTEL_SUCCESS,
    UPDATE_HOTEL_FAIL,
    HOTEL_DETAILS_REQUEST,
    HOTEL_DETAILS_SUCCESS,
    HOTEL_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/hotelConstants'

export const getHotel = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {

        //keyword = '', currentPage = 1, price, category

        dispatch({ type: ALL_HOTELS_REQUEST})
        let link = `/api/v1/hotels/newhotels?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        
        if(category) {
            link = `/api/v1/hotels/newhotels?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_HOTELS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_HOTELS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminHotels = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_HOTELS_REQUEST })

        const { data } = await axios.get(`/api/v1/hotels/`)
        
        
        dispatch({
            type: ADMIN_HOTELS_SUCCESS,
            payload: data.data
        })

    } catch (error) {

        dispatch({
            type: ADMIN_HOTELS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newhotel = (hotelData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_HOTEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/hotels/`, hotelData, config)
        
        dispatch({
            type: NEW_HOTEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_HOTEL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getHotelDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: HOTEL_DETAILS_REQUEST})
        // setTimeout(() => {
            const { data } = await axios.get(`/api/v1/hotels/${slug}`)
            //const data = res.data
            
        dispatch({
            type: HOTEL_DETAILS_SUCCESS,
            payload: data.hotel
        })

    } catch (error) {
        dispatch({
            type: HOTEL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.patch(`/api/v1/reviews`, reviewData, config)
        
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete hotel (Admin)
export const deleteHotel = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_HOTEL_REQUEST })

        const { data } = await axios.delete(`/api/v1/hotels/${id}`)
        
        dispatch({
            type: DELETE_HOTEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_HOTEL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update hotel (ADMIN)
export const updatehotel = (id, hotelData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_HOTEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.patch(`/api/v1/hotels/${id}`, hotelData, config)
        //const data = res.data
        dispatch({
            type: UPDATE_HOTEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_HOTEL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all reviews
export const allReviews = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_REVIEWS_REQUEST })

        const { data } = await axios.get('/api/v1/reviews/')
        //const data = res.data
        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get hotel reviews
export const getHotelReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews/${id}`)
        //const data = res.data
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.data
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete hotel review
export const deleteReview = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}`)
        //const data = res.data

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () =>  (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}