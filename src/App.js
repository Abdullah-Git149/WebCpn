import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import AddLocation from './pages/AddLocation';
import CouponList from './pages/CouponList';
import CreateCoupon from './pages/CreateCoupon';
import Home from './pages/Home';
import { useSelector, useDispatch } from 'react-redux'
import { getUserToken, token } from "./store/slices/userSlice"
import SignUp from './pages/SignUp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermCondition from './pages/TermCondition';
import RedeemedCoupons from './pages/RedeemedCoupon';
import Payment from './pages/Payment';
function App() {
  const authToken = useSelector(getUserToken)
  const dispatch = useDispatch()
   useEffect(() => {
    try {
      dispatch(token())
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          {authToken ? <>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/addlocation" element={<AddLocation />} />
            <Route path="/couponlist" element={<CouponList />} />
            <Route path="/RedeemedCoupons" element={<RedeemedCoupons />} />
            <Route path="/createcoupon" element={<CreateCoupon />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/term-and-conditions" element={<TermCondition />} />
            <Route path="/payment" element={<Payment />} />
          </> : <>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </>}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
