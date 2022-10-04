import React,{useEffect} from 'react'
import Header from '../components/Header' 
import { useDispatch,useSelector } from 'react-redux'
import { getTcPp, TcPp } from '../store/slices/userSlice'
import moment from 'moment'
const TermCondition = () => {
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
      <section className="term-condition-sec">
        <div className="container type-2">
          <div className="term-condition-wrap">
            <div className="term-condition-box">
              <h1 className="heading">Terms and conditions</h1>
               <h1 className="heading-2">Terms &amp; Conditions</h1>
              <div className="content-box">
                <p className="gen-paragraph">
                  {Tc?.termCondition}
                 </p> 
                <p className="last-update">Last Updated: {moment(Tc?.updatedAt).format("MMM DD, YYYY")}</p> 
              </div> 
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermCondition