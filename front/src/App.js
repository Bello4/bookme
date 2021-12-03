import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

//Homepage
import Header from './components/layouts/Header';
import Hotels from './components/layouts/Hotels';
import Footer from './components/layouts/Footer';
import HomePage from './components/layouts/HomePage';

//Users
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile'
import UpdatedProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


//Admin
import DashBoard from './components/admin/DashBoard';
import HotelList from './components/admin/HotelList';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import NewHotel from './components/admin/NewHotel';
import BookingList from './components/admin/BookingList';
import HotelReviews from './components/admin/HotelReview';

//Authentication
import ProtectedRoute from './components/route/ProtectedRoute';

import { loadUser } from './actions/userActions'
import store from './store'

//boookings
import Booking from './components/booking/Booking';
import BookingSuccess from './components/booking/BookingSuccess'
import MyBookings from './components/booking/MyBookings';
import BookingDetails from './components/booking/BookingDetails';

//Payment
import Payment from './components/booking/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'




function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/payments/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
    <div>
      <Header />
      <Route path="/" component={Hotels} exact />
      <Route path="/search/:keyword" component={Hotels} />
      <Route path="/hotel/:id" component={HomePage} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Register} exact />

      <ProtectedRoute path="/me" component={Profile} exact />
      <ProtectedRoute path="/me/update" component={UpdatedProfile} exact />
      <ProtectedRoute path="/password/update/" component={UpdatePassword} exact />
      <Route path="/password/forgot" component={ForgotPassword} exact />
      <Route path="/password/reset/:token" component={NewPassword} exact />

      <ProtectedRoute path="/dashboard" isAdmin={true} component={DashBoard} exact />
      <ProtectedRoute path="/admin/hotels" isAdmin={true} component={HotelList} exact />
      <ProtectedRoute path="/admin/users" isAdmin={true} component={UserList} exact />
      <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
      <ProtectedRoute path="/admin/createhotels" isAdmin={true} component={NewHotel} exact />
      <ProtectedRoute path="/admin/bookings" isAdmin={true} component={BookingList} exact />
      <ProtectedRoute path="/admin/booking/:id" isAdmin={true} component={BookingDetails} exact />
      <ProtectedRoute path="/admin/reviews" isAdmin={true} component={HotelReviews} exact />
      

      <ProtectedRoute path="/bookingform" component={Booking} exact />
      {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
      }
      <ProtectedRoute path="/success" component={BookingSuccess} exact />
      <ProtectedRoute path="/bookings/me" component={MyBookings} exact />

      
      {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
      )}
      
    </div>
    </Router>
  );
}

export default App;
