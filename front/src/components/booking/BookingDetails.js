import React, { Fragment, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingDetails, clearErrors } from '../../actions/bookingActions'
import '../../App.css'

const BookingDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, booking } = useSelector(state => state.bookingDetails);
    //const { user } = useSelector(state => state.user)

    useEffect(() => {
        
        dispatch(getBookingDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])
    


    return (
        <Fragment>
            <div class="modal-dialog modal-dialog-centered">
                <section className="pricing space">
                <div className="box-container space">
                <div className="box">
                <h3>Booked {booking && String(booking.paidAt).substring(0, 10)}</h3>
                <ul className="font-size">
                    <li>{booking && booking.hotelName}</li>
                    <li>service plan ${booking && booking.service}/night</li>
                    <li>⏳ duration of {booking && booking.duration} days</li>
                    <li>💸 amount paid ${booking && booking.price}</li>
                     <li>🔓 check in {booking && String(booking.arrival).substring(0, 10)}</li>
                    <li>🔐 checkingout {booking && String(booking.leaving).substring(0, 10)}</li>
                    {/* <li>Booked by {booking && booking.user.name}</li>
                    <img src={booking && booking.user.avatar.url} alt="bookingUser_review" className="imagepreview"/> */}
                    
                </ul>
                

            </div>
            </div>
            </section>
            </div>
        </Fragment>
    )
}
           
export default BookingDetails
