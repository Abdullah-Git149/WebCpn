import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resendCode, user_id, verifyAccount } from "../store/slices/userSlice"
import NewPassword from './NewPassword'
import { useNavigate
} from "react-router-dom";
const OTPVerification = ({ switchbtn, setSwitchBtn, email, createCheck }) => {
    const [switchbtn2, setSwitchBtn2] = useState(false)
    const [otp, setOtp] = useState("")
    const id = useSelector(user_id) 
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(verifyAccount({ otp, user_id: id })).unwrap()
            setOtp('')
            setSwitchBtn(false)
            if(!createCheck){ 
                setSwitchBtn2(true)
            }
            else{
                navigate("/")
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const resendOTP = async () => {
        try {
            await dispatch(resendCode({ user_id: id })).unwrap()
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const closeModal = () => {
        setOtp('')
        setSwitchBtn(false)
    }
    return (
        <>
            <div className={switchbtn ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn ? "block" : 'none',zIndex:100 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <p className="pass-text">OTP Verification</p>
                        <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="pass-form-wrap">
                                    <div className="fieldBox mb-2">
                                        <input type="number" placeholder="Enter 6 Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <p onClick={() => resendOTP()} className="white-anchor" style={{ color: "red", cursor: "pointer" }}>Resend OTP</p>
                                    </div>
                                    <div className="login-button mt-2">
                                        <button type="submit" className="cta-btn col-reds w-100">Verify OTP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <NewPassword switchbtn2={switchbtn2} setSwitchBtn2={setSwitchBtn2} email={email} />
        </>
    )
}

export default OTPVerification