import { 
    ALL_HOTELS_REQUEST,
    ALL_HOTELS_SUCCESS,
    ALL_HOTELS_FAIL,
    ADMIN_HOTELS_REQUEST,
    ADMIN_HOTELS_SUCCESS,
    ADMIN_HOTELS_FAIL,
    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_RESET,
    NEW_HOTEL_FAIL,
    DELETE_HOTEL_REQUEST,
    DELETE_HOTEL_SUCCESS,
    DELETE_HOTEL_RESET,
    DELETE_HOTEL_FAIL,
    UPDATE_HOTEL_REQUEST,
    UPDATE_HOTEL_SUCCESS,
    UPDATE_HOTEL_RESET,
    UPDATE_HOTEL_FAIL,
    HOTEL_DETAILS_REQUEST,
    HOTEL_DETAILS_SUCCESS,
    HOTEL_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
 } from '../constants/hotelConstants'

export const hotelReducer = (state = { hotels:[] }, action) => {
    switch(action.type) {
        case ALL_HOTELS_REQUEST:
        case ADMIN_HOTELS_REQUEST:
            return {
                loading: true,
                hotels: []
            }

        case ALL_HOTELS_SUCCESS:
            return {
                loading: false,
                hotels: action.payload.hotels,
                hotelCounts: action.payload.hotelCounts,
                resPerPage: action.payload.resPerPage,
                filterhotelCount: action.payload.filterHotelCount
            }

        case ADMIN_HOTELS_SUCCESS:
            return {
                loading: false,
                hotels: action.payload
            }
    
        case ALL_HOTELS_FAIL: 
        case ADMIN_HOTELS_FAIL:
            return {
                loading: false,
                error: action.payload

            }

        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null

            }

        default:
             return state;
    }
}


export const newHotelReducer = (state = { hotel: {} }, action) => {
    switch (action.type) {

        case NEW_HOTEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_HOTEL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                hotel: action.payload
            }

        case NEW_HOTEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_HOTEL_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const hotelsReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_HOTEL_REQUEST:
        case UPDATE_HOTEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_HOTEL_FAIL:
        case UPDATE_HOTEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_HOTEL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_HOTEL_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const hotelDetailsReducer = (state = { hotel: {} }, action ) => {
    switch(action.type) {
        case HOTEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case HOTEL_DETAILS_SUCCESS:
            return {
                loading: false,
                hotel: action.payload
            }

        case HOTEL_DETAILS_FAIL: 
            return {
                ...state,
                error: action.payload

            }

        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null

            }

        default: 
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
        case ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
        case ALL_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
        case ALL_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}