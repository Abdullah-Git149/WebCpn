import React, { useState, useEffect } from 'react'
import { addCard, getAllCards } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from "../utils/Payment";
const Payment = ({ error, setError }) => {
    const [modal, setModal] = useState(false)
    const [card_number, setCard_number] = useState('')
    const [exp_month, setExp_month] = useState('')
    const [exp_year, setExp_year] = useState('')
    const [card_cvc, setCard_cvc] = useState('')
    const [focus, setFocus] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    var update = error
    const toggleModal = () => {
        if (update == 0) {
            setModal(true)
            update = 1
        }
    }
    const closeModal = () => {
        update = 0
        setModal(false)
        setError(false)
    }

    const handleInputFocus = ({ target }) => {
        setFocus(target.name)
    };

    const handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
            setCard_number(target.value)
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
            setExp_month(target.value.slice(0, 2))
            setExp_year(target.value.slice(3, 5))

        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
            setCard_cvc(target.value)
        } else if (target.name === "name") { 
            setName(target.value)
        }

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addCard({ card_number, exp_month, exp_year, card_cvc, nameOnCard: name })).unwrap()
            setModal(false)
            setCard_number('')
            setExp_month('')
            setExp_year('')
            setCard_cvc('')
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
        toggleModal()

    }, [update])

    return (
        <>
            <div className={modal ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: modal ? "block" : 'none', zIndex: 100 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <p className="pass-text">Add Card</p>
                        <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <Cards
                                cvc={card_cvc}
                                expiry={exp_month + exp_year}
                                focused={focus}
                                name={name}
                                number={card_number}
                            />
                            <form onSubmit={handleSubmit}>
                                <div className="pass-form-wrap">
                                    <div className="login-button mt-2" > 
                                        <div className="fieldBox mb-2 ">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name on Card" 
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </div>
                                        <div className='row' style={{ justifyContent: "space-evenly" }}  >
                                            <div className="fieldBox mb-2 col-6 " >
                                                <input
                                                    type="tel"
                                                    name="number"
                                                    placeholder="Card Number" 
                                                    onChange={handleInputChange}
                                                    onFocus={handleInputFocus}
                                                />
                                            </div>
                                            <div className="fieldBox mb-2 col-3">
                                                <input
                                                    type="tel"
                                                    name="expiry"
                                                    placeholder="Valid Thru" 
                                                    style={{ fontSize: 13 }}
                                                    onChange={handleInputChange}
                                                    onFocus={handleInputFocus}
                                                />
                                            </div>
                                            <div className="fieldBox mb-2 col-2">
                                                <input
                                                    type="tel"
                                                    name="cvc"
                                                    placeholder="CVC" 
                                                    style={{ fontSize: 13 }} 
                                                    onChange={handleInputChange}
                                                    onFocus={handleInputFocus}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="cta-btn col-reds w-100">Add Card</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment