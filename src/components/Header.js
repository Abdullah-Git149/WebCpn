import React, { useState, useEffect } from 'react'
import leftMenu from '../assets/images/left-menu.png'
import logo2 from '../assets/images/logo-2.png'
import location from '../assets/images/location.png'
import user from '../assets/images/user.png'
import management from '../assets/images/management.png'
import favicon from '../assets/images/favicon.png'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, getUserStatus, userLogout } from "../store/slices/userSlice"
import {
  useNavigate
} from "react-router-dom";
import {
  Link
} from "react-router-dom";
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import Notification from './Notification'
import Spinner from './Spinner'
import { notification } from '../store/slices/couponSlice'
const Header = () => {
  const profile = useSelector(getProfile)
  const [active, setActive] = useState(false)
  const [switchbtn, setSwitchBtn] = useState(false)
  const [switchbtn2, setSwitchBtn2] = useState(false)
  const [switchbtn3, setSwitchBtn3] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const status = useSelector(getUserStatus)

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap()
      navigate("/")
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  const businessNoti = async () => {
    try {
      setSwitchBtn3(true)
      await dispatch(notification()).unwrap()
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    } 
  }
  return (
    <div>
      {status === "loading" ? (<>
        <Spinner />
      </>) : (<></>)}
      <header>
        <div className="header-wrapper">
          <div className="container type-2">
            <div className="content-wrapper">
              <div className="left-menu">
                <img src={leftMenu} alt="" className="img-fluid mobile-toggle" onClick={() => setActive((prev) => !prev)} />
              </div>
              <div className="logo-wraps">
                <Link to="/"><img src={logo2} alt="" className="img-fluid" /></Link>
              </div>
              <div className="d-flex align-items-center" >
                <a onClick={() => businessNoti()} className="notificationIcon me-2" data-bs-toggle="modal" data-bs-target="#exampleModalCenterFour"><i className="fa-solid fas fa-bell" /></a>
                <div className="dropdown-wrapper">
                  <div className="right-menu" style={{ overflow: "hidden" }}>
                    <img alt='' style={{ width: "100%", height: "100%" }} src={profile?.imageName ? `${process.env.REACT_APP_APIURL}${profile?.imageName}` : user} className="w-text" />
                  </div>
                  <ul className="drop-down">
                    <li><a style={{ cursor: "pointer" }} >{profile?.name}</a></li>
                    <li onClick={() => setSwitchBtn((prev) => !prev)}><a style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModalCentertwo">Edit Profile</a></li>
                    <li onClick={() => setSwitchBtn2((prev) => !prev)}><a style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Change Password</a></li>
                    <li className="log-out" onClick={() => handleLogout()}><a style={{ cursor: "pointer" }}>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-wrap" style={{
          left: active ? "0%" : "-100%",
        }}>
          <ul className="mobile-menu">
            <li > <Link onClick={()=>setActive(false)} to="/"><img src={favicon} alt="" className="img-fluid icon-mang" />Home</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/couponlist"><img src={management} alt="" className="img-fluid icon-mang" />Coupon Management</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/RedeemedCoupons"><img src={management} alt="" className="img-fluid icon-mang" />Redeemed Coupon</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/addlocation"><img src={location} alt="" className="img-fluid icon-mang-two" />Location Management</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/payment"><img src={location} alt="" className="img-fluid icon-mang-two" />Payment</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/privacy-policy"><img src={location} alt="" className="img-fluid icon-mang-two" />Privacy Policy</Link> </li>
            <li > <Link onClick={()=>setActive(false)} to="/term-and-conditions"><img src={location} alt="" className="img-fluid icon-mang-two" />Terms and Conditions</Link> </li>
          </ul>
        </div>
      </header>
      {/* Edit-profile-modal-start */}
      <EditProfile switchbtn={switchbtn} setSwitchBtn={setSwitchBtn} />
      {/* Edit-profile-modal-end */}
      {/* change-password-modal-start */}
      <ChangePassword switchbtn2={switchbtn2} setSwitchBtn2={setSwitchBtn2} />
      {/* change-password-modal-end */}
      {/* Edit-profile-modal-start */}
      <Notification switchbtn3={switchbtn3} setSwitchBtn3={setSwitchBtn3} />
      {/* Edit-profile-modal-end */}
    </div>
  )
}

export default Header