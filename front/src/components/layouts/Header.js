import React, { Fragment, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'
import Search from './Search'
import '../../App.css'

const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const [login, setLogin] = useState(false);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, user } = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('loggout successfully')
    }
    

    const moonHandler = () => {

        let themeBtn = document.querySelector('#theme-btn');
        themeBtn.classList.toggle('fa-sun');

        if(themeBtn.classList.contains('fa-sun')){
            document.body.classList.add('active');
        }else{
            document.body.classList.remove('active');
        }

    };

    const setLoginHandler = () => {
        setLogin(!login)
    }
    const setSearchHandler = () => {
        setSearchBar(!searchBar)
    }
    return (
        <Fragment>
            <div className="header bottomSpace">

            <Link to="/" className="logo"> <i className="fas fa-paper-plane"></i> hotel.me</Link>

            <Route render={({ history }) => <Search history={history} searchBar={searchBar}/> } />

            <div className="icons">
                <div className="fas fa-search" id="search-btn" onClick={setSearchHandler}></div>
                <div className="fas fa-moon" id="theme-btn" onClick={moonHandler}></div>
                <div className="fas fa-user" id="login-btn" onClick={setLoginHandler}></div>
            </div>

            <form action="" className={login ? "login-form active" : "login-form"} >
            {user ? (
                <Fragment>
                 <figure className="avatar avatar-nav">
                    <img
                        src={user.avatar && user.avatar.url}
                        alt={user.name && user.name}
                        className="rounded-circle"
                    />
                </figure>
                <span className="font-size font-color ml-3">{user && user.name}</span>
                <Link to="/me" className="btn">my Profile</Link>
                
                { user && user.role  === 'admin' ? 
                <Fragment>
                <Link to="/dashboard" className="btn">Dashboard</Link>
                <Link to="/bookings/me" className="btn">my Bookings</Link>
                </Fragment>
                 :
                <Link to="/bookings/me" className="btn">my Bookings</Link>
                }
                
                <Link to="/" className="btn" onClick={logoutHandler}>logout</Link>
                </Fragment>
            ) : !loading && <Link to="/login" className="btn" >login</Link>}
            </form>

            </div>
        </Fragment>
    )
}

export default Header
