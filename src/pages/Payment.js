import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCards, getUserCards, getUserError, getUserStatus, setCardDefault, deleteCard } from "../store/slices/userSlice"
import Spinner from '../components/Spinner'
import Switch from "react-switch";
import Payments from '../components/Payment'
import moment from "moment"
const ToggleCheck = ({ getid, is_active }) => {
      const dispatch = useDispatch()
      const handleChange = async (getid) => {
            try {
                  await dispatch(setCardDefault(getid)).unwrap()
                  try {
                        await dispatch(getAllCards()).unwrap()
                  } catch (rejectedValueOrSerializedError) {
                        console.log(rejectedValueOrSerializedError)
                  }
            } catch (rejectedValueOrSerializedError) {
                  console.log(rejectedValueOrSerializedError)
            }
      }
      return (
            <Switch onChange={() => handleChange(getid)} checked={is_active ? true : false} uncheckedIcon={false} checkedIcon={false} onColor={'#2e8b57'}/>
      );
};
const Payment = () => {
      const dispatch = useDispatch()
      const [switchbtn2, setSwitchBtn2] = useState(false)
      const [id, setId] = useState()
      const cards = useSelector(getUserCards)
      const status = useSelector(getUserStatus)
      const error = useSelector(getUserError)
      const [Errors, setError] = useState(false)

      const openModal = (id) => {
            setSwitchBtn2(true)
            setId(id)
      }
      const cardDelete = async (id) => {
            try {
                  await dispatch(deleteCard(id)).unwrap()
                  setSwitchBtn2(false)
                  try {
                        await dispatch(getAllCards()).unwrap()
                  } catch (rejectedValueOrSerializedError) {
                        console.log(rejectedValueOrSerializedError)
                  }
            } catch (rejectedValueOrSerializedError) {
                  console.log(rejectedValueOrSerializedError)
            }
      }

      useEffect(() => {
            async function getCards() {
                  try {
                        await dispatch(getAllCards()).unwrap()
                  } catch (rejectedValueOrSerializedError) {
                        console.log(rejectedValueOrSerializedError)
                  }
            }
            let mount = true
            if (mount) {
                  getCards();
            }
            return () => {
                  mount = false
            }
      }, [])
      return (
            <>
                  {status === "loading" ? (
                        <Spinner />
                  ) : (<></>)}
                  <Header />
                  <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
                        <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                    <p className="pass-text">Confirmation</p>
                                    <button onClick={() => setSwitchBtn2(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    <div className="modal-body">
                                          <form >
                                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                                      <div className="login-button mt-2" style={{ width: "40%" }}>
                                                            <button type="button" onClick={() => cardDelete(id)} className="cta-btn col-reds w-100">Delete</button>
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
                  <section className="checkout-sec-2">
                        <div className="container" >
                              <div className="row create-sec-1" style={{ padding: 0 }}>
                                    <div className="login-button mt-2 mb-4" style={{ width: "80%", display: "flex", justifyContent: "flex-end" }} >
                                          <button onClick={() =>
                                                setError(true)
                                          } className="cta-btn col-reds" style={{ padding: 5 }}>Add Card</button>
                                    </div>
                              </div>
                              <div className="checkout-form payment-card">
                                    <div style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                          {cards ?
                                                cards?.slice(0).reverse().map((item, i) =>
                                                      <div key={i} className="row create-sec-1" style={{ padding: 0 }}>
                                                            <div className="login-button mt-2 mb-4" style={{ display: "flex", justifyContent: "center" }} >
                                                                  <div style={{ display: "flex", flexDirection: "row", borderBottom: '1px solid gray', width: "50%" }}>
                                                                        <div style={{ width: "90%" }}>
                                                                              <p style={{ fontWeight: "bold" }}>****{item?.card_number.slice(-4)}</p>
                                                                              <p>Expires  {moment(`${item?.exp_month}`).format("MMM")} 20{item?.exp_year}</p>
                                                                        </div>
                                                                        <div style={{ display: "flex", justifyContent: "center", width: "20%", alignItems: "flex-end", margin: 5 }}>
                                                                              <ToggleCheck getid={item?._id} is_active={item?.is_active} />
                                                                              <span onClick={() => openModal(item?._id)} style={{ marginLeft: 10, cursor: "pointer" }} ><i className="fas fa-trash-alt "  /></span>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ) :
                                                <>
                                                      <p style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}>{error}</p>
                                                </>
                                          }
                                    </div>
                              </div>
                        </div>
                  </section>
                  {Errors ? <Payments error={0} setError={setError} /> : <> </>}
            </>
      )
}

export default Payment
