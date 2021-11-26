import React, { Fragment, useState, useEffect} from 'react'

import SideBar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newhotel, clearErrors } from '../../actions/hotelActions'

const NewHotel = ({ history }) => {

    const [name, setName] = useState('');
    const [miniprice, setMiniprice] = useState('');
    const [about, setAbout] = useState('');
    const [establishDate, setEstablishDate] = useState('');
    const [description, setDescription] = useState('')
    const [ratingsAverage, setRatingsAverage] = useState('')
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [coordinates, setCoordinates] = useState('')
    const [basicPlanPrice, setBasicPlanPrice] = useState('')
    const [premiunPlanPrice, setPremiunPlanPrice] = useState('')
    const [standardPlanPrice, setStandardPlanPrice] = useState('')
    const [category, setCategory] = useState([])
    const [basicPlanAbout, setBasicPlanAbout] = useState('')
    const [premiunPlanAbout, setPremiunPlanAbout] = useState('')
    const [standardPlanAbout, setStandardPlanAbout] = useState('')
    const [address, setAddress] = useState('')


    // const categories = [
    //   'hotel',
    //   'shotlet'
    // ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success} = useSelector(state => state.newHotel);

    useEffect(() => {
        if(error) {
          alert.error(error)
          dispatch(clearErrors)
        }

        if(success) {
          history.push('/')
          alert.success('New Hotel has been successfuly created')
        }
    }, [dispatch, alert, error, history, success])

    const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('miniprice', miniprice);
      formData.append('about', about);
      formData.append('establishDate', establishDate);
      formData.append('description', description);
      formData.append('ratingsAverage', ratingsAverage);
      formData.append('coordinates', coordinates);
      formData.append('basicPlanPrice', basicPlanPrice);
      formData.append('premiunPlanPrice', premiunPlanPrice);
      formData.append('standardPlanPrice', standardPlanPrice);
      formData.append('category', category);
      formData.append('basicPlanAbout', basicPlanAbout);
      formData.append('premiunPlanAbout', premiunPlanAbout);
      formData.append('standardPlanAbout', standardPlanAbout);
      formData.append('address', address);
      
      
      images.forEach(image => {
        formData.append('images', image)
      })

      dispatch(newhotel(formData))
      if(success) {
        history.push('/')
        alert.success('New Hotel has been successfuly created')
      }
  }

  const onChange = e => {

    //reads multiple image from frontend
    const files = Array.from(e.target.files)

    // when user try to reupload other images it 
    // sets the state to an empty array again

    setImagesPreview([]);
    setImages([]);

  //looping throung arrays of images
  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = () => {
      //set all uploaded images into images array
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, reader.result])
        }
    }

    reader.readAsDataURL(file)
  })
    

  }

    return (
        <Fragment>
            <div className="row">
            <div className="col-12 col-md-2">
                <SideBar />
            </div>

            <div className="col-12 col-md-10">
              <Fragment>

                <div className="wrapper my-5"> 
                <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                  <h1 className="mb-4">New Product</h1>

                  <div className="form-group font-size font-color">
                  <label for="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group font-size font-color">
                    <label for="price_field">Minimum Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={miniprice}
                      onChange={(e) => setMiniprice(e.target.value)}
                    />
                </div>

                <div className="form-group font-size font-color">
                    <label for="price_field">Ratings Average</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={ratingsAverage}
                      onChange={(e) => setRatingsAverage(e.target.value)}
                    />
                </div>

                  <div className="form-group font-size font-color">
                    <label for="description_field">About Hotel</label>
                    <textarea className="form-control" id="description_field" rows="8" value={about} onChange={(e) => setAbout(e.target.value)} ></textarea>
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="category_field">Hotel Category</label>
                      <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option >hotel</option>
                        <option >hotel</option>
                        <option >shotlet</option>
                      </select>
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="price_field">BasicPlan Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={basicPlanPrice}
                      onChange={(e) => setBasicPlanPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group font-size font-color">
                    <label for="description_field">BasicPlan About</label>
                    <textarea className="form-control" id="description_field" rows="8" value={basicPlanAbout} onChange={(e) => setBasicPlanAbout(e.target.value)} ></textarea>
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="price_field">StandardPlan Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={standardPlanPrice}
                      onChange={(e) => setStandardPlanPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group font-size font-color">
                    <label for="description_field">StandardPlan About</label>
                    <textarea className="form-control" id="description_field" rows="8" value={standardPlanAbout} onChange={(e) => setStandardPlanAbout(e.target.value)}></textarea>
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="price_field">PremiunPlan Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={premiunPlanPrice}
                      onChange={(e) => setPremiunPlanPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group font-size font-color">
                    <label for="description_field">PremiunPlan About</label>
                    <textarea className="form-control" id="description_field" rows="8" value={premiunPlanAbout} onChange={(e) => setPremiunPlanAbout(e.target.value)} ></textarea>
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="stock_field">Establish Date</label>
                    <input
                      type="date"
                      id="stock_field"
                      className="form-control"
                      value={establishDate}
                      onChange={(e) => setEstablishDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group font-size font-color">
                    <label for="seller_field">Address</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group font-size font-color">
                    <label for="seller_field">Description</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group font-size font-color">
                    <label for="seller_field">Coordinates</label>
                    <input
                      type="number"
                      id="seller_field"
                      className="form-control"
                      value={coordinates}
                      onChange={(e) => setCoordinates(e.target.value)}
                    />
                  </div>
                  
                  <div className='form-group font-size font-color'>
                    <label>Images</label>
                    
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='product_images'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                                multiple
                            />
                            <label className='custom-file-label' for='customFile'>
                                Choose Images
                            </label>
                        </div>
                        {imagesPreview.map(img => (
                          
                          <img src={img} key={img} alt="Images Preview" className="imagepreview" />
                          
                        ))}
                  </div>

        
                      <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                      disabled={loading ? true : false}
                      >
                      CREATE
                      </button>

                      </form>
                  </div>
                </Fragment>
                
                </div>

                </div>
            
        </Fragment>
    )
}

export default NewHotel
