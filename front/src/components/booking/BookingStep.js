import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const BookingStep = ({ confirmBooking, payment}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {confirmBooking ? <Link to='/bookingform' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step font-size active- font-size">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step font-size incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step font-size active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step font-size incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

        </div>
    )
}

export default BookingStep
