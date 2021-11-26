import React, {Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layouts/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    //const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
            alert.success('login successfull')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
                //redirect,
    }, [dispatch, alert, isAuthenticated, error,  history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
        
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row wrapper space"> 
                    <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3 font-size font-color">Login</h1>
                        <div className="form-group font-size font-color">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control font-size"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group font-size font-color">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control font-size"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        LOGIN
                        </button>

                        <Link to="/signup" className="float-right mt-3">New User?</Link>
                    </form>
                    </div>
                </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
