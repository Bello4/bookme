import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux';


const BookingForm = () => {
    const alert = useAlert();
    const history = useHistory();

    const { user } = useSelector(state => state.auth)

    const [arrival, setArrival] = useState('');
    const [leaving, setLeaving] = useState('');
    const [location, setLocation] = useState('');
    const [plan, setPlan] = useState('');

    

    const submitHandler = (e) => {
        e.preventDefault();

        if (plan === 'Select Plan') return alert.error('cannot choose plan of empty')

        const formData = {
            'arrival': arrival,
            'leaving': leaving,
            'location': location,
            'plan': plan
            
        };

        localStorage.setItem('formData', JSON.stringify(formData));
        history.push('/bookingform')
    }

    return (
        <div>
            {/* <!-- filter form section starts  --> */}

            <section className="form-container" data-aos="zoom-in">

            <form action=""  onSubmit={submitHandler}>

                <div className="inputBox">
                    <span>plan</span>
                    <select className="font-size" value={plan} onChange={(e) => setPlan(e.target.value)}>
                        <option>Select Plan</option>
                        <option>basicPlanPrice</option>
                        <option>standardPlanPrice</option>
                        <option>premiunPlanPrice</option>
                    </select>
                </div>

                <div className="inputBox">
                    <span>comming from</span>
                    <input type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="search places"/>
                </div>


                <div className="inputBox">
                    <span>arrivals</span>
                    <input type="date"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    />
                </div>

                <div className="inputBox">
                    <span>leaving</span>
                    <input type="date" 
                    value={leaving}
                    onChange={(e) => setLeaving(e.target.value)}
                    />
                </div>

                <input type="submit" value="book now" className="btn" disabled={user ? false : true }/>

            </form>

            </section>

            {/* <!-- filter form section ends --> */}
        </div>
    )
}

export default BookingForm
