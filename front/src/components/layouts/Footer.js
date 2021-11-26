import React, { Fragment } from 'react'
import '../../App.css'

const Footer = () => {
    return (
        <Fragment>
            <section className="footer">

            <div className="box-container">

                <div className="box" data-aos="fade-up">
                    <h3>our branches</h3>
                    <a href="#"> <i className="fas fa-map-marker-alt"></i> england </a>
                    <a href="#"> <i className="fas fa-map-marker-alt"></i> canada </a>
                </div>

                <div className="box" data-aos="fade-up">
                    <h3>contact info</h3>
                    <a href="#"> <i className="fas fa-phone"></i> +234 8135120892</a>
                    <a href="#"> <i className="fas fa-envelop"></i> bellooladepo@gmail.com </a>
                </div>

                <div className="box" data-aos="fade-up">
                    <h3>follow us</h3>
                    <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
                    <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
                    <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
                    
                </div>

            </div>

            <div className="credit"> creadet by <span>Ahmed Bello, Oladepo web designer</span> | all rights reserved </div>
                
            </section>
        </Fragment>
    )
}

export default Footer
