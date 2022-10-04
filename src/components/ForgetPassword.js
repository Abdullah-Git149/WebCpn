import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgetPass } from "../store/slices/userSlice"
import OTPVerification from './OTPVerification'
const ForgetPassword = ({ switchbtn2, setSwitchBtn2, }) => {
    const [switchbtn, setSwitchBtn] = useState(false)
    const [email, setEmail] = useState("")
    const [routeEmail, setRouteEmail] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(forgetPass({ email })).unwrap()
            setSwitchBtn2(false)
            setSwitchBtn(true)
            setEmail('')
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const closeModal = () => {
        setSwitchBtn2(false)
        setEmail('')
    }
    return (
        <>
            <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <p className="pass-text">Forget Password</p>
                        <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="pass-form-wrap">
                                    <div className="fieldBox mb-2">
                                        <input type="text" placeholder="Enter Email Address" value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                            setRouteEmail(e.target.value)
                                        }} />
                                    </div>
                                    <div className="login-button mt-2">
                                        <button type="submit" className="cta-btn col-reds w-100">Send Verification</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <OTPVerification switchbtn={switchbtn} setSwitchBtn={setSwitchBtn} email={routeEmail} />
        </>
    )
}

export default ForgetPassword