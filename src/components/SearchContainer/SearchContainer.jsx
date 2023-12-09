import React, { useEffect, useReducer, useState } from 'react'
import { axiosGet } from '../../util/https.server'
import { NEAREST_URL, ORSM_URL, Profile } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateFrom, updateTo } from '../../store/NearBySlice'

const SearchContainer = () => {
  const dispatch = useDispatch();

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const { from, to } = useSelector((state) => state.nearBy);

  const fetchNearest = async () => {
    const response = await axiosGet(NEAREST_URL(Profile.bike, [48.8534951, 2.3483915]))
    dispatch(updateTo(response?.data?.waypoints))
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(updateFrom([position.coords.latitude, position.coords.longitude]))
    });
  }

  const handleChange = (value, setState) => {
    setState(value)
  }

  return (
    <div>
      <input placeholder='From' />
      <input onChange={(e) => handleChange(e.target.value, setToValue)} placeholder='To' />
      <button onClick={() => fetchNearest()}>Submit</button>
    </div>
  )
}

export default SearchContainer