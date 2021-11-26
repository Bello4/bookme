import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import BookingStep from './BookingStep'

import { useSelector } from 'react-redux'

const Booking = () => {

    const history = useHistory();
    let data = JSON.parse(localStorage.getItem('formData'));
    
    const { hotel } = useSelector(state => state.hotelDetails);

    
    const [service, setService] = useState('')
    const [arrival, setArrival] = useState(data.arrival);
    const [leaving, setLeaving] = useState(data.leaving);
    const [location, setLocation] = useState(data.location);
    const [contact, setContact] = useState('');
    const [hotelName, setHotelName] = useState(hotel.name);
    const [price, setPrice] = useState('');


     //define two date object variables with dates inside it  
     let date1 = new Date(arrival);  
     let date2 = new Date(leaving);  

     //calculate time difference  
     let time_difference = date2.getTime() - date1.getTime();  

     //calculate days difference by dividing total milliseconds in a day  
     let days = time_difference / (1000 * 60 * 60 * 24);
    const [duration, setDuration] = useState(days);

    useEffect(() => {
        if (data.plan === 'basicPlanPrice') {
        setService(hotel.basicPlanPrice)
        let totalPay = Math.round(hotel.basicPlanPrice * days)
        setPrice(totalPay)
    }

    if (data.plan === 'standardPlanPrice') {
        setService(hotel.standardPlanPrice)
        let totalPay = Math.round(hotel.standardPlanPrice * days)
        setPrice(totalPay)
    }

    if (data.plan === 'premiunPlanPrice') {
        setService(hotel.premiunPlanPrice)
        let totalPay = Math.round(hotel.premiunPlanPrice * days)
        setPrice(totalPay)
    }
    }, [hotel.basicPlanPrice, hotel.standardPlanPrice, hotel.premiunPlanPrice, days, data.plan])
    
    
    const submitHandler = () => {

       const bookingData = {
           'service': service,
           'arrival': arrival,
           'leaving': leaving,
           'location': location,
           'contact': contact,
           'price': price,
           'duration': duration,
           'hotelName': hotelName
       }

       localStorage.setItem('bookingData', JSON.stringify(bookingData));
        history.push('/payment')
    }

    return (
        <Fragment>


            <BookingStep confirmBooking />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4 font-color">Booking Info</h1>

                        <div className="form-group font-size  font-color">
                            <label htmlFor="postal_code_field">Hotel</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control font-size"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group font-size font-color">
                            <label htmlFor="address_field">Address: state & home address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control font-size"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group font-size font-color">
                            <label htmlFor="city_field">Arrival Date</label>
                            <input
                                type="date"
                                id="city_field"
                                className="form-control font-size"
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        

                        <div className="form-group font-size font-color">
                            <label htmlFor="city_field">Departure Date</label>
                            <input
                                type="date"
                                id="city_field"
                                className="form-control font-size"
                                value={leaving}
                                onChange={(e) => setLeaving(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group font-size font-color">
                            <label htmlFor="city_field">Days Duration</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control font-size"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group font-size font-color">
                            <label htmlFor="city_field">Accomodation Plan</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control font-size"
                                value={`$${service}`}
                                onChange={(e) => setService(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group font-size font-color">
                            <label htmlFor="postal_code_field">Amount to be Paid</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control font-size"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>

                        <div className="form-group  font-size font-color">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control font-size"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>

                        
                        

                        <button
                            id="shipping_btn"
                            className="btn btn-block py-3"
                            onClick={submitHandler}
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Booking



// useEffect(() => {

//     if ( arrival && leaving ) {
//     // calculation of no. of days between two date 
//     // To set two dates to two variables
//     let date1 = arrival;
//     let date2 = leaving;
    
//     // To calculate the time difference of two dates
//     let dates = date2.getTime(arrival) - date1.getTime(leaving);
    
//     // To calculate the no. of days between two dates
//     let days = dates / (1000 * 3600 * 24);

//     setDuration(days)
//     //To display the final no. of days (result)
//     }
// }, [arrival, leaving])