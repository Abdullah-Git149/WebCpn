import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import log2 from '../assets/images/log-2.png'
import log1 from '../assets/images/log-1.png'
import { useDispatch,useSelector } from 'react-redux'
import { getUserStatus, signinUser, userProfile  } from "../store/slices/userSlice"
import {
  useNavigate,
  Link
} from "react-router-dom";
import ForgetPassword from '../components/ForgetPassword'
import Spinner from '../components/Spinner'
const Login = () => {
  const [switchbtn2, setSwitchBtn2] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSecureEntry, setisSecureEntry] = useState(true) 
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const status=useSelector(getUserStatus)
   const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await dispatch(signinUser({ email, password })).unwrap()
      navigate('/');
      try {
        await dispatch(userProfile()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  return (
    <div>
       {status==="loading"?(<>
      <Spinner/>
      </>):(<></>)}
      <section className="login-sec-1">
        <div className="container">
          <div className="formScreen-wrap">
            <div className="logo text-center">
              <img src={logo} alt="logo" className="img-fluid" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="screen-heading">
                <p className="white-heading text-center">Business Login</p>
              </div>
              <div className="fieldBox mb-4">
                <span><i className="fas fa-envelope" /></span>
                <input type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="fieldBox">
                <span><i className="fas fa-lock" /></span>
                <input type={isSecureEntry?"password":"text"} placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                <span><i className={isSecureEntry?"fas fa-eye":"fas fa-eye-slash"} onClick={() => { setisSecureEntry((prev) => !prev) }} /></span>
              </div>
              <div className="forgetPassword" >
                <Link to="/signup"><p className="white-anchor" style={{ color: "white", cursor: "pointer" }}>Create an account</p></Link>
                <p onClick={() => setSwitchBtn2(true)} className="white-anchor" style={{ color: "white", cursor: "pointer" }}>Forgot Password?</p>
              </div>
              <div className="login-button mt-2 mb-4">
                <button type="submit" className="cta-btn w-100" >Log In</button>
              </div>
            </form>
          </div>
        </div>
        <img src={log2} alt='' className="img-fluid log-2-image" />
        <img src={log1} alt='' className="img-fluid log-1-image" />
      </section>
      <ForgetPassword switchbtn2={switchbtn2} setSwitchBtn2={setSwitchBtn2} />
    </div>
  )
}

export default Login