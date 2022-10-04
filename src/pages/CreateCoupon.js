import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import uploadImage from "../assets/images/upload-image.png"
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from "../store/slices/userSlice"
import { addCoupon, getError, getStatus } from "../store/slices/couponSlice"
import Spinner from '../components/Spinner'
import moment from 'moment'
import Payment from '../components/Payment'


const data = [
  { "id": 1, category: "Select Category", value: "" },
  { "id": 1, category: "Beverages", value: "Beverages" },
  { "id": 2, category: "Fast Food", value: "Fast Food" },
  { "id": 3, category: "Mint", value: "Mint" },
  { "id": 4, category: "Desert", value: "Desert" },
  { "id": 5, category: "Desi", value: "Desi" }
]
const CreateCoupon = () => {
  const [category, setCategory] = useState("")
  const [couponLaunch, setCouponLaunch] = useState('')
  const [validity, setValidity] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')
  const [couponTitle, setCouponTitle] = useState('')
  const [discountType, setDiscountType] = useState('No Discount')
  const [files, setFiles] = useState([])
  const [value, setValue] = useState(10)
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const status = useSelector(getStatus)
  const disableDates = moment(new Date()).format("YYYY-MM-DDT00:00")
  const updateSlider = (value) => {
    setValue(value)
  }

  const { getRootProps, getInputProps } = useDropzone({
    method: "get",
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('couponTitle', couponTitle)
    formData.append('brandCategory', category)
    formData.append('launchDate', couponLaunch)
    formData.append('validTill', validity)
    formData.append('discountVoucher', discount + discountType)
    formData.append('radius', value)
    formData.append('couponDescription', description)
    formData.append('couponImage', files[0])
    try {
      await dispatch(addCoupon(formData)).unwrap()
      setCategory('')
      setDescription('')
      setDiscount('')
      setFiles([])
      setValidity('')
      setCouponLaunch('')
      setValue(10)
      setCouponTitle('')
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  const error = useSelector(getError)
  useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file));
  }, [files]);

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
        </>
      )}
      <Header />
      <section className="create-sec-1">
        <div className="container">
          <div className="location-wrap">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <p className="graphTitle mbb-10">Create Coupon</p>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox carret-wrapper mb-3">
                    <input type="text" placeholder="Enter Coupons Title" value={couponTitle} onChange={(e) => setCouponTitle(e.target.value)} />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox carret-wrapper mb-3">
                    <input type="text" placeholder="Enter Coupons Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox carret-wrapper mb-3">
                    <select id="selectCountry" className='fieldBox' value={category} name="selectCountry" onChange={(e) => setCategory(e.target.value)} >
                      {data?.map((item, i) =>
                        <option key={i} value={item?.value}>{item?.category}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox mb-2">
                    <input type="text" placeholder="Enter Coupon Start Date/Time" onFocus={(e) => (e.target.type = "datetime-local")}
                      onBlur={(e) => (e.target.type = "datetime-local")} min={disableDates} value={couponLaunch} onChange={(e) => setCouponLaunch(e.target.value)} />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox mb-2">
                    <input type="text" placeholder="Enter Coupon EndDate/Time" onFocus={(e) => (e.target.type = "datetime-local")}
                      onBlur={(e) => (e.target.type = "datetime-local")} min={disableDates} value={validity} onChange={(e) => setValidity(e.target.value)} />
                  </div>
                </div>
                <div className="col-4 col-md-4 col-lg-5">
                  <div className="fieldBox mb-3">
                    <input type={discountType !== " Free Stuff" ? "number" : "text"} onKeyDown={discountType!==" Free Stuff"?(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault():""} style={{ display: discountType === "No Discount" ? "none" : "block" }} placeholder="Enter Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    <select className="fieldBox" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onChange={(e) => { discountType === "No Discount" ? setDiscount('') : setDiscount(''); setDiscountType(e.target.value) }} >
                      <option value='No Discount'>No Discount</option>
                      <option value=' Free Stuff'>Free Stuff</option>
                      <option value='%'>%</option>
                      <option value='$'>$</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="logo-gif-wrapper">
                    <p className="graphTitle">Add Logo/GIF:</p>
                  </div>
                  <div className="par-forwrap2 mb-4">
                    <div {...getRootProps()} id="dropzone">
                      <div className="dropzone needsclick" id="demo-upload" action="/upload">
                        <div className="dz-message needsclick">
                          <span className="note needsclick">
                            <input {...getInputProps()} />
                            {files.length > 0 ? files?.map(file => (
                              <div key={file?.name}>
                                <div  >
                                  <img alt='' src={file?.preview} className="img-fluid upload-imgwrap" style={{ width: "100%", height: "100%" }} />
                                  <p className="upload-text mt-2" id="fileLabelText"> {file?.name}
                                  </p>

                                </div>
                              </div>
                            )) :
                              <div>
                                <img alt='' src={uploadImage} className="img-fluid upload-imgwrap" />
                                <p className="upload-text mt-2" id="fileLabelText">
                                  Upload Business <span className="pic-text">Image</span>
                                </p>
                              </div>
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="preview-template" style={{ display: 'none' }} />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="radius-wrapper">
                    <div className="logo-gif-wrapper mb-2">
                      <p className="graphTitle">Set Radius: {value > 0 ? value : ''}</p>
                    </div>
                    <div className="wrap mb-3">
                      <input type="range" className="range" min={0} max={100} step="0.1" value={value} onChange={(e) => updateSlider(e.target.value)} />
                      <div className="track">
                        <div className="track-inner" style={{ width: `${value}%` }} />
                      </div>
                      <div className="thumb" style={{ transform: `translate(-${value}%, -50%)`, left: `${value}%` }} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="map-wrap">
                    {profile ? (<>
                      <iframe title='map' src={`https://maps.google.com/maps?q=${profile?.location?.coordinates[1]},${profile.location.coordinates[0]}&hl=es;z=14&output=embed`} width={600} height={450} style={{ border: 0, transformOrigin: 0, transform: 'scale(1)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </>) : (<>
                    </>)}
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="login-button mt-2 mb-4">
                    <button type="submit" className="cta-btn col-reds w-100">Generate Coupon</button>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="dollars-wrapper">
                    <p className="graphTitle">Posting Fee: $0.1 </p>
                    <p className="graphTitle">Click Fee: $0.33</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section >
      <Payment error={error} />
    </>
  )
}

export default CreateCoupon