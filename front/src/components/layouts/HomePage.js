import React, { Fragment, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MapBox from './MapBox';
import Loader from './Loader';
import { getHotelDetails, clearErrors } from '../../actions/hotelActions'
import '../../App.css'
import BookingForm from './BookingForm';

const HomePage = ({match}) => {

    const dispatch = useDispatch() ;
    const alert = useAlert()

    const {loading, hotel, error} = useSelector(state => state.hotelDetails);

    useEffect(() => {
        dispatch(getHotelDetails(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, match.params.id, error, alert])

    



    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                <div className="row d-flex justify-content-around space">
                    <div className="col-12 col-lg-6 card-img">
                        <Carousel pause='hover' >
                            {hotel.images && hotel.images.map(image => (
                                <Carousel.Item key={image.public_id}>
                                    <img src={image.url} alt={hotel.name} className="d-block w-100"/>
                                </Carousel.Item>
                            ))}
                            
                            
                        </Carousel>
                        </div>
                    </div>

                {/* <!-- home section ends --> */}

                {/* <!-- about section starts --> */}
                    
                <section className="pricing" id="pricing">

                    <h1 className="heading"> <span>welcome to {hotel.name}</span> </h1>

                    <div className="box-container">

                        <div className="box" data-aos="zoom-in-up">
                            <h3>establish {String(hotel.establishDate).substring(0, 10)}</h3>
                            <ul>
                                <li>{hotel.about}</li>
                                <li>({hotel.reviews && hotel.reviews.length}reviews)</li>
                                <li>{hotel.description && hotel.description}</li>
                                <li>{hotel.address && hotel.address}</li>
                            </ul>
                        </div>

                    </div>

                    </section>

                {/* <!-- about section ends --> */}
                 
                {/* <!-- pricing section starts  --> */}

                <section className="pricing" id="pricing">

                    <h1 className="heading"> our <span>pricing</span> </h1>

                    <div className="box-container">

                         <div className="box" data-aos="zoom-in-up">
                            <h3> basic plan </h3>
                            <div className="price">
                                <span>&#8358;</span>
                                <span className="amount">{hotel.basicPlanPrice && hotel.basicPlanPrice}</span>
                                <span>/night</span>
                            </div>
                            <ul>
                                <li>{hotel.basicPlanAbout && hotel.basicPlanAbout}</li>
                                {/* <li>pets / {hotel.basicPlan && hotel.basicPlan.pets}</li>
                                <li>{hotel.basicPlan && hotel.basicPlan.description}</li> */}
                            </ul>
                            {/* <Link to="/bookingform" className="btn">choose plan</Link> */}
                        </div>

                        <div className="box" data-aos="zoom-in-up">
                            <h3> standard plan </h3>
                            <div className="price">
                                <span>&#8358;</span>
                                <span className="amount">{hotel.standardPlanPrice && hotel.standardPlanPrice}</span>
                                <span>/night</span>
                            </div>
                            <ul>
                                <li>{hotel.standardPlanAbout && hotel.standardPlanAbout}</li>
                                {/* <li>pets / {hotel.standardPlan && hotel.standardPlan.pets}</li>
                                <li>{hotel.standardPlan && hotel.standardPlan.description}</li> */}
                            </ul>
                            {/* <Link to="/bookingform" className="btn">choose plan</Link> */}
                        </div>

                        <div className="box" data-aos="zoom-in-up">
                            <h3> premium plan </h3>
                            <div className="price">
                                <span>&#8358;</span>
                                <span className="amount">{hotel.premiunPlanPrice && hotel.premiunPlanPrice}</span>
                                <span>/night</span>
                            </div>
                            <ul>
                                <li>{hotel.premiunPlanAbout && hotel.premiunPlanAbout}</li>
                                {/* <li>pets / {hotel.premiunPlan && hotel.premiunPlan.pets}</li>
                                <li>{hotel.premiunPlan && hotel.premiunPlan.description}</li> */}
                            </ul>
                            {/* <Link to="/bookingform" className="btn">choose plan</Link> */}
                        </div>

                    </div>

                </section>

                {/* <!-- pricing section ends --> */}

                    <BookingForm />

                {/* <!-- services section starts  --> */}

                <section className="services" id="services">

                <h1 className="heading"> our <span>services</span> </h1>

                <div className="box-container">

                    <div className="box" data-aos="zoom-in">
                        <span>01</span>
                        <i className="fas fa-hotel"></i>
                        <h3>affordable hotels</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                    <div className="box" data-aos="zoom-in">
                        <span>02</span>
                        <i className="fas fa-plane"></i>
                        <h3>fastest travel</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                    <div className="box" data-aos="zoom-in">
                        <span>03</span>
                        <i className="fas fa-utensils"></i>
                        <h3>food and drinks</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                    <div className="box" data-aos="zoom-in">
                        <span>04</span>
                        <i className="fas fa-globe"></i>
                        <h3>around the world</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                    <div className="box" data-aos="zoom-in">
                        <span>05</span>
                        <i className="fas fa-hiking"></i>
                        <h3>new adventures</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                    <div className="box" data-aos="zoom-in">
                        <span>01</span>
                        <i className="fas fa-bullhorn"></i>
                        <h3>safety guide</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                    </div>

                </div>

                </section>

                {/* <!-- services section ends --> */}

                <div className="space">
                    <h1 className="heading"> <span>Veiw Location</span> </h1>
                    <MapBox hotel={hotel} />
                    </div>

                {/* <!-- review section starts  --> */}

                <section className="review" id="review">

                    <h1 className="heading"> client's <span>review</span> </h1>

                    <div className="swiper-container review-slider" data-aos="zoom-in">

                        <Carousel >
                                {hotel.reviews && hotel.reviews.map(review => (
                                <Carousel.Item key={review.review._id}>
                                <img src={review.user && review.user.avatar.url}  alt=""/>
                                <h3>{review.user && review.user.name}</h3>
                                <p>{review.review}</p>
                                <div className="ratings mt-auto">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                </div>
                              
                            </Carousel.Item>
                            ))}
                        </Carousel >

                        {/* <div className="swiper-pagination"></div> */}

                    </div>

                    </section>
                    
                </Fragment>
            )}
            

        </Fragment>
    )
}

export default HomePage
