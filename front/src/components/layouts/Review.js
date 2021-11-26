import React, { Fragment } from 'react'
import { Carousel } from 'react-bootstrap'

const Review = ({ review }) => {

    
    return (
        <Fragment>
            {/* <!-- review section starts  --> */}

                <section className="review" id="review">

                <h1 className="heading"> client's <span>review</span> </h1>

                <div className="swiper-container review-slider" data-aos="zoom-in">

                    <Carousel >

                        <Carousel.Item>
                            <img src="images/pic-1.png" alt=""/>
                            <h3>john deo</h3>
                            <p>{review.review && review.review}</p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                        </Carousel.Item>

                        

                    </Carousel >

                    {/* <div className="swiper-pagination"></div> */}

                </div>

                </section>

            {/* <!-- review section ends --> */}
        </Fragment>
    )
}

export default Review
