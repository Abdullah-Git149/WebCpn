import React, { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import log2 from '../assets/images/log-2.png'
import log1 from '../assets/images/log-1.png'
import uploadImage from "../assets/images/upload-image.png"
import OTPVerification from '../components/OTPVerification'
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector} from 'react-redux'
import { getUserStatus, signupUser } from "../store/slices/userSlice"
import {
    Link 
} from "react-router-dom";
import Spinner from '../components/Spinner'


function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
const SignUp = () => {
    const [switchbtn, setSwitchBtn] = useState(false)
    const [createCheck, setCreateCheck] = useState(false)
    const [isSecureEntry, setisSecureEntry] = useState(true)  
    const [isSecureEntry2, setisSecureEntry2] = useState(true)  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirm_password] = useState("")
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [value, setValue] = useState(null);
    const [files, setFiles] = useState([])
    const dispatch = useDispatch()
    const status=useSelector(getUserStatus) 
    console.log(phone.length)
    const handleInput = (e) => { 
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);  
        setPhone(formattedPhoneNumber);
      }; 
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
    if (value) {
        geocodeByPlaceId(value?.value?.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                if (lat && lng) {
                    setLat(lat)
                    setLong(lng)
                }
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('confirm_password', confirm_password)
        formData.append('password', password)
        formData.append('photo', files[0])
        formData.append('lat', lat)
        formData.append('long', long)
        try {
            await dispatch(signupUser(formData)).unwrap()
            setSwitchBtn(true)
            setCreateCheck(true)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    useEffect(() => {
        files.forEach(file => URL.revokeObjectURL(file));
    }, [files]); 
    return (
        <>
        {status==="loading"?(<>
      <Spinner/>
      </>):(<></>)}
            <section className="login-sec-1 pt-5 pb-5">
                <div className="container">
                    <div className="formScreen-wrap">
                        <div className="logo text-center">
                            <a href="index.php">
                                <img src={logo} alt="logo" className="img-fluid" />
                            </a>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" >
                            <div className="screen-heading">
                                <p className="white-heading text-center">Business Signup</p>
                            </div>
                            {/* drag-start */}
                            <div {...getRootProps()} id="dropzone" className="mb-4 text-center">
                                <div className="dropzone needsclick businessImg" id="demo-upload" action="/upload">
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
                            {/* drag-end */}
                            <div className="fieldBox mb-4">
                                <span><i className="fa-solid fas fa-briefcase" /></span>
                                <input type="text" placeholder="Business Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="fieldBox mb-4">
                                <span><i className="fas fa-envelope" /></span>
                                <input type="text" placeholder="Business Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <GooglePlacesAutocomplete
                                    selectProps={{
                                        value,
                                        onChange: setValue,
                                    }}
                                    autocompletionRequest={{
                                        componentRestrictions: {
                                            country: ['us', 'pk'],
                                        }
                                    }} />
                            </div>

                            <div className="fieldBox mb-4">
                                <span><i className="fa-solid fas fa-phone" /></span>
                                <input  placeholder="(256) 854-7896"  onChange={(e) => handleInput(e)}  value={phone} />
                            </div>
                            <div className="fieldBox mb-4">
                                <span><i className="fas fa-lock" /></span>
                                <input type={isSecureEntry?"password":"text"} placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                                <span><i className={isSecureEntry?"fas fa-eye":"fas fa-eye-slash"} onClick={() => { setisSecureEntry((prev) => !prev) }} /></span> 
                            </div>
                            <div className="fieldBox mb-4">
                                <span><i className="fas fa-lock" /></span>
                                <input type={isSecureEntry2?"password":"text"} placeholder="Confirm Password" id="confirm_password" onChange={(e) => setConfirm_password(e.target.value)} />
                                <span><i className={isSecureEntry2?"fas fa-eye":"fas fa-eye-slash"} onClick={() => { setisSecureEntry2((prev) => !prev) }} /></span>
                            </div>
                            <div style={{
                                textAlign: "right",
                            }}>
                                <Link to="/"><p className="white-anchor" style={{ color: "white", cursor: "pointer" }}>Back to login</p></Link>
                            </div>
                            <div className="login-button mt-2 mb-4">
                                <button type="submit" className="cta-btn w-100">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <img alt='' src={log2} className="img-fluid log-2-image" />
                <img alt='' src={log1} className="img-fluid log-1-image" />
            </section>
            <OTPVerification switchbtn={switchbtn} setSwitchBtn={setSwitchBtn} createCheck={createCheck} />
        </>
    )
}

export default SignUp