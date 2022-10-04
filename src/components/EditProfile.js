import React, { useState, useEffect } from 'react'
import uploadImage from '../assets/images/upload-image.png'
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile, userProfile, getProfile } from '../store/slices/userSlice'

const EditProfile = ({ switchbtn, setSwitchBtn }) => {
  const profile = useSelector(getProfile)
  const [name, setName] = useState( "")
  
  const dispatch = useDispatch()
  const [files, setFiles] = useState([]) 
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
    formData.append('name', name==""?profile?.name:name)
    formData.append('photo', files[0])
    try {
      await dispatch(editProfile(formData)).unwrap()
      setSwitchBtn(false)
      try {
        await dispatch(userProfile()).unwrap()
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
  return (
    <div className={switchbtn ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCentertwo" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn ? 'block' : "none",zIndex:100 }}>
      <div className="modal-dialog modal-dialog-centered">
       <div  className="modal-content" style={{zIndex:1111,position:'relative'}}>
          <p className="pass-text">Edit Profile</p>
          <button onClick={() => setSwitchBtn(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="pass-form-wrap">
                <div className="fieldBox mb-2">
                  <input type="text" placeholder="Name"  defaultValue={profile?.name} onChange={(e) => setName(e.target.value)} />
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
                              <img alt='' src={`${process.env.REACT_APP_APIURL}${profile?.imageName}`} className="img-fluid upload-imgwrap" />
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

export default EditProfile