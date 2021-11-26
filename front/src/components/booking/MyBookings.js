import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { myBookings, clearErrors } from '../../actions/bookingActions'

import '../../App.css'

const MyBookings = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { bookings, error } = useSelector(state => state.myBookings);

    useEffect(() => {
        dispatch(myBookings());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <section className="pricing space">
                <div className="box-container space">
            {bookings && bookings.map(booking => (
                <div className="box">
                <h3>Booked {String(booking.paidAt).substring(0, 10)}</h3>
                <ul className="font-size">
                    <li>you booked 👉 {booking.hotelName}</li>
                    <li>service plan ${booking.service}/night🛏</li>
                    <li>⏳duration of {booking.duration} days</li>
                    <li>💸amount paid ${booking.price}</li>
                     <li>🔓check in {String(booking.arrival).substring(0, 10)}</li>
                    <li>🔐 checkingout {String(booking.leaving).substring(0, 10)}</li>
                </ul>
                <p className="font-size font-color">for more enquiry or adjustment of booking please contact surpport thank you.</p>
            </div>
            ))
            }
            </div>
            </section>
        </Fragment>
    )
}

export default MyBookings
