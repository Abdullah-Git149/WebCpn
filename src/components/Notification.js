import React from 'react'
import { getNotification, getError ,getStatus } from "../store/slices/couponSlice"
import { useSelector } from "react-redux"
import moment from "moment" 
import Spinner from './Spinner'
const Notification = ({ switchbtn3, setSwitchBtn3 }) => { 
  const noti = useSelector(getNotification)
  const error = useSelector(getError)   
  const status = useSelector(getStatus)    
  return (
    <> 
      <div  className={switchbtn3 ? "modal change-password-modal notificationModal" : "modal fade change-password-modal notificationModal"} id="exampleModalCenterFour" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn3 ? 'block' : "none" }}>
      {status === "loading" ? (
        <Spinner />
      ) : (<></>)}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <p className="pass-text">Notification</p>
            <button onClick={() => setSwitchBtn3(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal-body">
              <div className="notificationWrap">
                {noti?.length < 1 ? (<>
                  <p>{error}</p>
                </>) : (
                  noti?.map((item, i) =>
                    <div key={i} className="notificationItem">
                      <a className="imgBox">
                        <img src={`${process.env.REACT_APP_APIURL}${item?.brandImage}`} alt="img" />
                      </a>
                      <a className="textBox">
                        <span>
                          <h1 className="title"><span>{item?.couponTitle}</span> is {item?.action == "claimed" ? "claimed by" : item?.action == "userCouponRedeem" ? "redeemed by" : ""} {item?.user?.name}. </h1>
                          <p className="desc">{item?.discountVoucher}</p>
                        </span>
                        <p className="date">{moment(item?.createdAt).format("DD MMM, YYYY")}</p>
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification