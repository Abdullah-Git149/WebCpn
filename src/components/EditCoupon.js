import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { allCoupons, editCoupon } from '../store/slices/couponSlice'
import moment from "moment"
const EditCoupon = ({ item, switchbtn, setSwitchBtn }) => {
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState('')
  const [validDate, setValidDate] = useState('')
  const [couponTitle, setCouponTitle] = useState('')
  const [discountType, setDiscountType] = useState('')
  const [toggle, setToggle] = useState(false)
  const [files, setFiles] = useState([])
  const disableDates = moment(new Date()).format("YYYY-MM-DDT00:00")
  const dispatch = useDispatch()
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
  console.log(discountType)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('couponDescription', description ? description : item?.couponDescription)
    formData.append('couponTitle', couponTitle ? couponTitle : item?.couponTitle)
    formData.append('discountVoucher', toggle && (discount || discountType) ? discount + discountType : item?.discountVoucher)
    formData.append('validTill', validDate ? validDate : item?.validTill)
    formData.append('brandCategory', "Fast Food")
    formData.append('couponImage', files[0] ? files[0] : item?.brandImage)
    try {
      await dispatch(editCoupon({ formData: formData, id: item?._id })).unwrap()
      setCouponTitle('')
      setDescription("")
      setDiscount("")
      setValidDate("")
      setFiles([])
      setSwitchBtn(false)
      try {
        await dispatch(allCoupons()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file));
  }, [files]);
  const closeModal = () => {
    setSwitchBtn(false)
    setCouponTitle('')
    setDescription("")
    setDiscount("")
    setValidDate("")
    setFiles([])
  }
  return (
    <div className={switchbtn ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCentertwo" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn ? 'block' : "none", zIndex: 100 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <p className="pass-text">Edit Coupon</p>
          <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="pass-form-wrap">
                <div className="fieldBox mb-2">
                  <input type="text" placeholder="Coupon Title" onChange={(e) => setCouponTitle(e.target.value)} defaultValue={item?.couponTitle} />
                </div>
                <div className="fieldBox mb-2">
                  <input type="text" placeholder="Coupon Description" defaultValue={item?.couponDescription} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {toggle ? <>
                  <div className="fieldBox mb-3">
                  <input type={discountType !== " Free Stuff" ? "number" : "text"} onKeyDown={discountType!==" Free Stuff"?(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault():""} style={{ display: discountType === "No Discount" ? "none" : "block" }} placeholder="Enter Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    <select className="fieldBox" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onChange={(e) => { discountType === "No Discount" ? setDiscount('') : setDiscount(''); setDiscountType(e.target.value) }} >
                      <option value='No Discount'>No Discount</option>
                      <option value=' Free Stuff'>Free Stuff</option>
                      <option value='%'>%</option>
                      <option value='$'>$</option>
                    </select>
                  </div>
                </> : <>
                  <div className="fieldBox mb-3" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <input disabled placeholder={item?.discountVoucher} style={{ width: "50%", marginRight: 10 }} />
                    <span onClick={() => { setToggle(true); setDiscountType("No Discount") }} style={{ width: "10%", cursor: "pointer" }}><i style={{ color: "#424242", fontSize: 16 }} className="fas fa-edit" /></span>
                  </div>
                </>}
                <div className="fieldBox mb-2">
                  <input type="text" onFocus={(e) => (e.target.type = "datetime-local")}
                    onBlur={(e) => (e.target.type = "datetime-local")} min={disableDates} placeholder="Valid Date" defaultValue={moment(item?.validTill).format("YYYY/MM/DD hh:mm a")} onChange={(e) => setValidDate(e.target.value)} />
                </div>
                <div className="par-forwrap2 mb-3">
                  {/* drag-start */}
                  <div  {...getRootProps()} id="dropzone">
                    <div className="dropzone needsclick" id="demo-upload" action="/upload">
                      <div className="dz-message needsclick">
                        <span className="note needsclick">
                          <input {...getInputProps()} />
                          {files?.length > 0 ? files?.map(file => (
                            <div key={file?.name}>
                              <div  >
                                <img alt='' src={file?.preview} className="img-fluid upload-imgwrap" />
                                <p className="upload-text mt-2" id="fileLabelText"> {file?.name}
                                </p>
                              </div>
                            </div>
                          )) :
                            <div>
                              <img alt='' src={`${process.env.REACT_APP_APIURL}${item?.brandImage}`} className="img-fluid upload-imgwrap" />
                              <p className="upload-text mt-2" id="fileLabelText">
                                Upload Business <span className="pic-text">Picture</span>
                              </p>
                            </div>
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div id="preview-template" style={{ display: 'none' }} />
                  {/* drag-end    */}
                </div>
                <div className="login-button mt-2">
                  <button type="submit" className="cta-btn col-reds w-100">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCoupon