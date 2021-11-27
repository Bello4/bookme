import React, { Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Carousel } from 'react-bootstrap'
import Slider from 'rc-slider'
import { useAlert } from 'react-alert'
import Loader from './Loader';

import 'rc-slider/assets/index.css'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getHotel, allReviews, clearErrors } from '../../actions/hotelActions'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range);



const Hotels = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 3000]);
    const [category, setCategory] = useState('')

    const categories = [
        'shortlet',
        'hotel'
    ]

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, hotels, error, hotelCounts, resPerPage, filterHotelCount} = useSelector(state => state.hotels);
    const { reviews } = useSelector(state => state.allReviews)
    const keyword = match.params.keyword

    useEffect(() => {
        

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        dispatch(getHotel(keyword, currentPage, price, category))
        dispatch(allReviews())

    }, [dispatch, alert, error, keyword, currentPage, price, category])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = hotelCounts
    if(keyword) {
        count = filterHotelCount
    }

        
    return (
        <Fragment>
            {loading ? <Loader /> : (

            <Fragment>

                {/* <!-- packages section starts  --> */}

            <section className="packages" id="packages">

            <h1 className="heading space"> Book <span>Hotels & ShortLet</span> Fast.  </h1>

            <div className="">
                {keyword ? (
                    <Fragment>
                        <div className="col-6 col-md-3 mt-5 mb-5">
                            <Range 
                              marks= {{
                                1: `$1`,
                                1000: `$3000`
                              }}
                              min={1}
                              max={3000}
                              defaultValue={[1, 3000]}
                              tipFormatter={ value => `$${value}`}
                              tipProps={{
                                placement: "top",
                                visible: true
                              }}
                              value={price}
                              onChange={price => setPrice(price)}
                            />
                            <hr className="my-5"/>
                            <div className="mt-5">
                              <h4 className="mb-3 font-size font-color">
                                Categories
                              </h4>
                              <ul className="pl-0 font-size font-color">
                                {categories.map(category => (
                                  <li className="catig"
                                              key={category}
                                              onClick={() => setCategory(category)
                                              }>
                                                {category}
                                  </li>
                                ))}
                              </ul>
                            </div>
                        </div>

                <div className="box-container">
                    {hotels && hotels.map(hotel => (
                    <div key={hotel._id} className="box">
                    <div className="image">
                        <img src={hotel.images[0].url} alt={hotel.name}/>
                        <h3><i className="fas fa-map-marker-alt"></i> {hotel.address}</h3>
                    </div>
                    <div className="content">
                        <div className="price">${hotel.miniprice}<span>350.99</span> </div>
                        <div className="price">{hotel.name}</div>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <p>{hotel.category}</p>
                        <Link to={`/hotel/${hotel._id}`} className="btn"> book now</Link>
                    </div>
                </div>
                ))} </div>

                </Fragment>
                ) : (
                   <Fragment>
                    <div className="box-container">
                        {hotels && hotels.map(hotel => (
                        <div key={hotel._id} className="box">
                        <div className="image">
                            <img src={hotel.images[0].url} alt={hotel.name}/>
                            <h3><i className="fas fa-map-marker-alt"></i> {hotel.address}</h3>
                        </div>
                        <div className="content">
                            <div className="price">${hotel.miniprice}<span>350.99</span> </div>
                            <div className="price">{hotel.name}</div>
                            <div className="ratings mt-auto">
                            <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            </div>
                            </div>
                            <p>{hotel.category}</p>
                            <Link to={`/hotel/${hotel._id}`} className="btn"> book now</Link>
                        </div>
                        </div>
                        ))}
                    </div>
                   </Fragment> 
                )}
                
            </div>
                {resPerPage <= count && (
                <div className="d-flex justify-content-center mt-5 font-size">
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={hotelCounts}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                )}
            </section>

            {/* <!-- packages section ends --> */}


            <section className="home" id="home">

            <div className="image" data-aos="fade-down">
                <img src="images/Booking-bro.svg" alt=""/>
            </div>

            <div className="content" data-aos="fade-up">
                <h3>adventure is worthwhile</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis explicabo eius inventore reprehenderit alias eos facilis, ipsa est asperiores repellendus!</p>
                <Link href="#" className="btn">explore now</Link>
            </div>

            </section>


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
                    <h3>fast and secure booking</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box" data-aos="zoom-in">
                    <span>03</span>
                    <i className="fas fa-dollar"></i>
                    <h3>money back garranty </h3>
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
                    <h3>specail bonus for clents</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box" data-aos="zoom-in">
                    <span>06</span>
                    <i className="fas fa-bullhorn"></i>
                    <h3>safety guide</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

            </div>

            </section>

            {/* <!-- services section ends --> */}

            

            {/* <!-- review section starts  --> */}

            <section className="review" id="review">

            <h1 className="heading"> client's <span>review</span> </h1>

            <div className="swiper-container review-slider" data-aos="zoom-in">

                <Carousel pause='hover' >

                    {reviews && reviews.map(review => (

                    <Carousel.Item  key={review._id} className="swiper-slide slide">
                        <img src={review.user && review.user.avatar.url} alt={review.user && review.user.public_id}/>
                        <h3>{review.user && review.user.name}</h3>
                        <p>{review.review}</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                    </Carousel.Item >
                    ))}

                    
                </Carousel>

                <div className="swiper-pagination"></div>

            </div>

            </section>

            {/* <!-- review section ends --> */}

            {/* <!-- contact section starts  --> */}

            <section className="contact" id="contact">

            <h1 className="heading"> <span>contact</span> us </h1>

            <form action="" data-aos="zoom">

                <div className="inputBox">
                    <input type="text" placeholder="name" data-aos="fade-up"/>
                    <input type="email" placeholder="email" data-aos="fade-up"/>
                </div>

                <div className="inputBox">
                    <input type="number" placeholder="number" data-aos="fade-up"/>
                    <input type="text" placeholder="subject" data-aos="fade-up"/>
                </div>

                <textarea name="" placeholder="your message" id="" cols="30" rows="10" data-aos="fade-up"></textarea>
                
                <input type="submit" value="send message" className="btn"/>

            </form>

            </section>

            {/* <!-- contact section ends --> */}

            {/* <!-- blog section starts  --> */}

            <section className="blogs" id="blogs">

            <h1 className="heading"> our <span>blogs</span> </h1>

            <div className="box-container">

                <div className="box" data-aos="fade-up">
                    <div className="image">
                        <img src="images/blog-1.svg" alt=""/>
                    </div>
                    <div className="content">
                        <h3>explore the world now, adventure awaits</h3>
                        <Link href="#" className="btn">read more</Link>
                        <div className="icons">
                            <Link href="#"> <i className="fas fa-calendar"></i> 1st jan, 2021 </Link>
                            <Link href="#"> <i className="fas fa-user"></i> by admin </Link>
                        </div>
                    </div>
                </div>

                <div className="box" data-aos="fade-up">
                    <div className="image">
                        <img src="images/blog-2.svg" alt=""/>
                    </div>
                    <div className="content">
                        <h3>explore the world now, adventure awaits</h3>
                        <Link href="#" className="btn">read more</Link>
                        <div className="icons">
                            <Link href="#"> <i className="fas fa-calendar"></i> 1st jan, 2021 </Link>
                            <Link href="#"> <i className="fas fa-user"></i> by admin </Link>
                        </div>
                    </div>
                </div>

                <div className="box" data-aos="fade-up">
                    <div className="image">
                        <img src="images/blog-3.svg" alt=""/>
                    </div>
                    <div className="content">
                        <h3>explore the world now, adventure awaits</h3>
                        <Link href="#" className="btn">read more</Link>
                        <div className="icons">
                            <Link href="#"> <i className="fas fa-calendar"></i> 1st jan, 2021 </Link>
                            <Link href="#"> <i className="fas fa-user"></i> by admin </Link>
                        </div>
                    </div>
                </div>

            </div>

            </section>

            {/* <!-- blog section ends --> */}


            </Fragment>
            )}
            
        </Fragment>
    )
}

export default Hotels
