import React,{useEffect} from 'react'
import Header from '../components/Header'
import { useDispatch,useSelector } from 'react-redux'
import { getTcPp, TcPp } from '../store/slices/userSlice'
 const PrivacyPolicy = () => {
  const dispatch=useDispatch()
  const Tc=useSelector(getTcPp)  
  useEffect(() => {
    async function TcPpData() {
      try {
        await dispatch(TcPp()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    let mount = true
    if (mount && !Tc) {
      TcPpData();
    }
    return () => {
      mount = false
    }
  }, [])
  return (
    <>
      <Header />
      <section className="privacy-policy-sec">
        <div className="container type-2">
          <div className="privacy-policy-wrap">
            <div className="top-text-box">
              <h1 className="heading">PRIVACY POLICY</h1>
              <p className="tagline">{Tc?.privacyPolicy}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy