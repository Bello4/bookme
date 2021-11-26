import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layouts/Loader'
import SideBar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allBookings, deleteBooking, clearErrors } from '../../actions/bookingActions'
import { DELETE_BOOKING_RESET } from '../../constants/bookingConstants'


const BookingList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, bookings } = useSelector(state => state.allBookings);
    const { isDeleted } = useSelector(state => state.booking)

    useEffect(() => {
        dispatch(allBookings());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('booking deleted successfully');
            history.push('/admin/bookings');
            dispatch({ type: DELETE_BOOKING_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteBookingHandler = (id) => {
        dispatch(deleteBooking(id))
    }

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Hotel Name',
                    field: 'hotelName',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        bookings.forEach(booking => {
            data.rows.push({
                id: booking._id,
                hotelName: booking.hotelName,
                price: `$${booking.price}`,
                status: booking.paymentInfo.status,
                actions: <Fragment>
                    <Link to={`/admin/booking/${booking._id}`} className="btn btn-primary py-1 px-2" data-toggle="modal" data-target="#myModal" >
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBookingHandler(booking._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10 space">
                    <Fragment>
                        <h1 className="my-5">All Bookings</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setBookings()}
                                className="px-3 font-size"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default BookingList
