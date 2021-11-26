import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layouts/Loader'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'

import { getAdminHotels, allReviews } from '../../actions/hotelActions'
import { allUsers } from '../../actions/userActions'
import { allBookings } from '../../actions/bookingActions'

//mdb was install using npm ins mdbreact --legacy-peer-deps

const DashBoard = () => {


     const dispatch = useDispatch();

     const { hotels } = useSelector(state => state.hotels)
     const { users, loading } = useSelector(state => state.allUsers)
     const { reviews } = useSelector(state => state.allReviews)
     const { bookings } = useSelector(state => state.allBookings)

    useEffect(() => {
      dispatch(getAdminHotels())
      dispatch(allUsers())
      dispatch(allReviews())
      dispatch(allBookings())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10 space">
                    <h1 className="my-4 font-color">Dashboard</h1>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body font-size">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>$4567</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size ">Hotels<br /> <b>{hotels && hotels.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/hotels">
                                            <span className="float-left font-size">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Bookings<br /> <b>{bookings && bookings.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/bookings">
                                            <span className="float-left font-size">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left font-size">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Reviews<br /> <b>{reviews && reviews.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/reviews">
                                            <span className="float-left font-size">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default DashBoard
