import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, deleteCoupon, allCoupons, getError, getStatus } from '../store/slices/couponSlice';
import moment from 'moment';
import EditCoupon from '../components/EditCoupon';
import Spinner from '../components/Spinner';
const CouponList = () => {
  const [switchbtn2, setSwitchBtn2] = useState(false)
  const [switchbtn, setSwitchBtn] = useState(false)
  const [id, setId] = useState()
  const [item, setItem] = useState()
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const coupons = useSelector(getCoupons)
  const status = useSelector(getStatus)
  const error = useSelector(getError)

  const openModal = (id) => {
    setSwitchBtn2(true)
    setId(id)
  }
  const openEditModal = (item) => {
    setSwitchBtn(true)
    setItem(item)
  }
  const couponDelete = async (id) => {
    try {
      await dispatch(deleteCoupon(id)).unwrap()
      setSwitchBtn2(false)
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
    async function coupons() {
      try {
        await dispatch(allCoupons()).unwrap()
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
  const coupon = coupons.filter((e) => {
    if (search === '') {
      return e;
    }
    else {
      return e?.couponTitle?.toLowerCase()?.includes(search)
    }
  })
  return (
    <>
      {status === "loading" ? (
        <Spinner/>
      ) : (<></>)}
      <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <p className="pass-text">Confirmation</p>
            <button onClick={() => setSwitchBtn2(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal-body">
              <form >
                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <div className="login-button mt-2" style={{ width: "40%" }}>
                    <button type="button" onClick={() => couponDelete(id)} className="cta-btn col-reds w-100">Delete</button>
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
      { switchbtn ? 

<EditCoupon item={item} switchbtn={switchbtn} setSwitchBtn={setSwitchBtn} />

      :
      <>
      </>
      }
      <Header />
      <div>
        <section className="coupon-sec-1">
          <div className="container">
            <div className="coupon-list-wrap">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="fieldBox carret-wrapper mb-3" style={{
                     boxShadow: "3px 4px 10px #9E9E9E"
                    
                  }} >
                    <input type="text" placeholder="Search.." onChange={(e) => setSearch(e?.target?.value.toLowerCase())} />
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
                          <tr >
                            <th style={{ borderWidth: 0 }}>{error}
                            </th>
                          </tr>
                          :
                          coupon?.map((item, i) =>
                            <tr key={i}>
                              <th className="table-gen-text" scope="row">{i + 1}</th>
                              <td className="table-gen-text">{item.couponTitle}</td>
                              <td className="table-gen-text">{item.discountVoucher}</td>
                              <td className="table-gen-text">{moment(item.validTill).format('YYYY-MM-DD')}</td>
                              <td><span className="edit-icon"><span style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => openEditModal(item)}><i className="fas fa-edit" /></span></span><span className="edit-icon"><span style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => openModal(item._id)}  ><i className="fas fa-trash-alt" /></span></span></td>
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

export default CouponList