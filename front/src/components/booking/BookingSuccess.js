import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="row justify-content-center space">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto sz" src="/images/order_success.png" alt="Booking Success" />

                    <h2 className="font-size font-color">Your Booking has been placed successfully.</h2>

                    <Link to="/bookings/me" className="font-size" >Go to Bookings</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
