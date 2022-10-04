import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addLocation, getbranches, getProfile, userBranches } from "../store/slices/userSlice"
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

const AddLocation = () => {
  const navigate = useNavigate();
  const profile = useSelector(getProfile)
  const [value, setValue] = useState(null);
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const branches = useSelector(userBranches)
  if (value) {
    geocodeByPlaceId(value?.value?.place_id)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        if (lat && lng) {
          setLat(lat)
          setLong(lng)
          setName(value?.value?.description)
        }
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addLocation({ name, lat, long })).unwrap()
      setName('')
      setLong('')
      setLat('')
      try {
        await dispatch(getbranches()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  useEffect(() => {
    async function allbranches() {
      try {
        await dispatch(getbranches()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    let mount = true
    if (mount) {
      allbranches();
    }
    return () => {
      mount = false
    }
  }, [])
  return (
    <>
      <Header />
      <section className="location-sec-1">
        <div className="container">
          <div className="location-wrap">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <p className="graphTitle mbb-10">Add a Location</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="col-12 col-md-12 col-lg-12">
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
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="login-button mt-2 mb-4">
                    <button type="submit" className="cta-btn col-reds w-100">Add Another</button>
                  </div>
                </div>
                {branches?.name?.map((item, i) => 
                  <div key={i} className="col-12 col-md-12 col-lg-12">
                    <div className="fieldBox carret-wrapper mb-3" style={{ backgroundColor: "#e0e0e0", borderWidth: 1 }}>
                      <input type="text" disabled value={item} />
                    </div>
                  </div> 
                )}
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="map-wrap">
                    <iframe title='map' src={`https://maps.google.com/maps?q=${profile?.location?.coordinates[1]},${profile.location.coordinates[0]}&hl=es;z=14&output=embed`} width={600} height={450} style={{ border: 0, transformOrigin: 0, transform: 'scale(1)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="login-button mt-2 mb-4">
                    <button onClick={() => navigate("../createcoupon")} type="submit" className="cta-btn col-reds w-100">Create New Coupon</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddLocation