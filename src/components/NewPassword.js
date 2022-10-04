import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newpassword } from "../store/slices/userSlice"
const NewPassword = ({ switchbtn2, setSwitchBtn2, email }) => {
     const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [isSecureEntry, setisSecureEntry] = useState(true) 
    const [isSecureEntry2, setisSecureEntry2] = useState(true) 

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(newpassword({ newPassword, confirmNewPassword, email })).unwrap()
            setNewPassword('')
            setConfirmNewPassword('')
            setSwitchBtn2(false)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const closeModal = () => {
        setNewPassword('')
        setConfirmNewPassword('')
        setSwitchBtn2(false)
    }
    return (
        <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <p className="pass-text">Reset Password</p>
                    <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="pass-form-wrap">
                                <div className="fieldBox mb-3">
                                    <input type={isSecureEntry?"password":"text"} placeholder="Enter New Password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <span><i className={isSecureEntry?"fas fa-eye":"fas fa-eye-slash"} onClick={() => { setisSecureEntry((prev) => !prev) }} /></span> 
                                </div>
                                <div className="fieldBox mb-3">
                                    <input type={isSecureEntry2?"password":"text"} placeholder="Confirm New Password" id="cpassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                    <span><i className={isSecureEntry2?"fas fa-eye":"fas fa-eye-slash"} onClick={() => { setisSecureEntry2((prev) => !prev) }} /></span> 
                                </div>
                                <div className="login-button mt-2">
                                    <button type="submit" className="cta-btn col-reds w-100">Update Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPassword