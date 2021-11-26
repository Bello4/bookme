import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components space font-size">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt font-size"></i> Hotels</a>
                        <ul className="collapse list-unstyled font-size" id="productSubmenu">
                            <li className="font-size">
                                <Link to="/admin/hotels"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li className="font-size">
                                <Link to="/admin/createhotels"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/bookings"><i className="fa fa-book"></i> Bookings</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default SideBar
