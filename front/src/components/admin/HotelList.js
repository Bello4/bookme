import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layouts/Loader'
import SideBar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminHotels, deleteHotel, clearErrors } from '../../actions/hotelActions'
import { DELETE_HOTEL_RESET } from '../../constants/hotelConstants'

const HotelList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, hotels } = useSelector(state => state.hotels);
    const { isDeleted } = useSelector(state => state.hotel)

    useEffect(() => {
        dispatch(getAdminHotels());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Hotel deleted successfully');
            history.push('/admin/hotels');
            dispatch({ type: DELETE_HOTEL_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteHotelHandler = (id) => {
        dispatch(deleteHotel(id))
    }

    const setHotels = () => {
        const data = {
            columns: [
                {
                    label: 'Hotel ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'miniprice',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        hotels.forEach(hotel => {
            data.rows.push({
                id: hotel._id,
                name: hotel.name,
                miniprice: `$${hotel.miniprice}`,
                category: hotel.category,
                actions: <Fragment>
                    <Link to={`/admin/hotel/${hotel._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHotelHandler(hotel._id)}>
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

                <div className="col-12 col-md-10 font-color">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setHotels()}
                                className="px-6 font-color font-size bd"
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

export default HotelList
