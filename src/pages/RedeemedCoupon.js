import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, getError, getStatus, getClaimedCoupons, redeemCoupon, notification } from '../store/slices/couponSlice';
import moment from 'moment';
import EditCoupon from '../components/EditCoupon';
import Spinner from '../components/Spinner';
const RedeemedCoupons = () => {
  const [switchbtn2, setSwitchBtn2] = useState(false)
  const [switchbtn, setSwitchBtn] = useState(false)
  const [id, setId] = useState()
  const [item, setItem] = useState()
  const [search, setSearch] = useState('')
  const [action, setAction] = useState('active')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const coupons = useSelector(getCoupons)
  const status = useSelector(getStatus)
  const error = useSelector(getError)
  const openModal = (id) => {
    setSwitchBtn2(true)
    setId(id)
  }
  const Redeem = async (id) => {
    try {
      await dispatch(redeemCoupon(id)).unwrap()
      setSwitchBtn2(false)
      try {
        await dispatch(getClaimedCoupons()).unwrap()
        await dispatch(notification()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  useEffect(() => {
    async function coupons() {
      try {
        await dispatch(getClaimedCoupons()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    let mount = true
    if (mount) {
      coupons();
    }
    return () => {
      mount = false
    }
  }, []) 
  const actionCheck = coupons.filter((e) => {
    if (action === 'active') {
      return `${e?.redeemed}`?.includes(false)
    }
    else {
      return `${e?.redeemed}`?.includes(true)
    }
  })

  const coupon = actionCheck.filter((e) => {
    if (search === '') {
      return e;
    }
    else {
      return `${e?.uniqueCode}`?.includes(search)
    }
  })
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (<></>)}
      <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <p className="pass-text">Redeem Coupon</p>
            <button onClick={() => setSwitchBtn2(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal-body">
              <form >
                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <div className="login-button mt-2" style={{ width: "40%" }}>
                    <button type="button" onClick={() => Redeem(id)} className="cta-btn col-reds w-100">Redeem</button>
                  </div>
                  <div className="login-button mt-2" style={{ width: "40%" }} >
                    <button type="button" onClick={() => setSwitchBtn2(false)} className="cta-btn col-reds w-100">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <EditCoupon item={item} switchbtn={switchbtn} setSwitchBtn={setSwitchBtn} />
      <Header />
      <div>
        <section className="coupon-sec-1">
          <div className="container">
            <div className="coupon-list-wrap">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <div className="fieldBox carret-wrapper mb-3">
                    <select className="fieldBox" onChange={(e) => setAction(e.target.value)} >
                      <option value='active'>Active</option>
                      <option value='redeemed'>Redeemed</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  <div className="fieldBox carret-wrapper mb-3">
                    <input type="number" onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} placeholder="Search Unique Code" value={search} onChange={(e) => setSearch(e?.target?.value )} />
                    <button type="submit" className="cta-btn col-reds"><span className="carret-downs"><i className="fas fa-search" /></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="coupon-sec-2">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="coupon-table-wrapper">
                  <div className="table-responsive">
                    <table className="table table-coupon">
                      <thead className="thead-dark">
                        <tr className="table-header-wrap">
                          <th scope="col" className="border-heading">ID</th>
                          <th scope="col">Coupon Name</th>
                          <th scope="col">Coupon Discount</th>
                          <th scope="col">Date</th>
                          <th scope="col" className="border-heading-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-greyy">
                        {coupon?.length < 1 ?
                          (
                            actionCheck.length < 1 ?
                              <th style={{ borderWidth: 0, width: 200, paddingLeft: 20 }}>No {action} Coupon Found
                              </th> :
                              <tr >
                                <th style={{ borderWidth: 0 }}>{error}
                                </th>
                              </tr>)
                          :
                          coupon?.map((item, i) =>
                            <tr key={i}>
                              <th className="table-gen-text" scope="row">{i + 1}</th>
                              <td className="table-gen-text">{item.couponTitle}</td>
                              <td className="table-gen-text">{item.discountVoucher}</td>
                              <td className="table-gen-text">{moment(item.validTill).format('YYYY-MM-DD')}</td>
                              <td>
                                {item?.redeemed ? <p style={{ color: "red", fontWeight: "bold", letterSpacing: 1 }}>Redeemed</p> :
                                  <span className="edit-icon"><span onClick={() => openModal(item._id)} style={{ marginLeft: 10, cursor: "pointer" }} ><i className="fas fa-check" /></span></span>
                                }
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="login-button mt-2 mb-4">
                  <button onClick={() => navigate("../createcoupon")} type="submit" className="cta-btn col-reds w-100">Create New Coupon</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default RedeemedCoupons