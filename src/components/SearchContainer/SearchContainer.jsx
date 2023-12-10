import React, { useState } from 'react'
import { axiosGet, axiosPost } from '../../util/https.server'
import { NEAREST_URL, OPEN_WEATHER_GEO_LOC_URL, ORSM_URL, Profile, TOLL_TAX_WITH_PATH_URL } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateFrom, updateTo } from '../../store/NearBySlice'

import CustomSearchSelect from '../../custom/CustomSelect'
import { Button, Checkbox, Col, Row, Switch } from 'antd'

const SearchContainer = () => {
  const dispatch = useDispatch();

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [isCurrentLocation, setIsCurrentLocation] = useState(true)

  const [location, setLocation] = useState([]);

  const { from, to } = useSelector((state) => state.nearBy);

  const fetchNearest = async () => {
    try {
      const response = await axiosGet(NEAREST_URL(Profile.bike, JSON.parse(toValue)))
      if (response?.status === 200) {
        dispatch(updateTo(response?.data?.waypoints));
        isCurrentLocation ?
          navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(updateFrom([position.coords.latitude, position.coords.longitude]))
          })
          : dispatch(updateFrom(JSON.parse(fromValue)));
        fetchTollTax(response?.data?.waypoints)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const debounce = (call, delay) => {
    let timmer;
    return function () {
      clearTimeout(timmer)
      setTimeout(() => { call() }, delay)
    }
  }
  // const debbouncerFunc = debounce(handleChange, 2000)

  const handleChange = (value, setState) => {
    setState(value)
  }

  const fetchTollTax = async (wayPoint) => {
    console.log(wayPoint, "fetchTax")
    const polyLine = wayPoint?.[0]?.hint;
    const data = "{\"from\":{\"address\":\"Philadelphia , Pennsylvania,\",\"lat\":39.95209,\"lng\":-75.16219},\"to\":{\"address\":\"New York ,NY,\",\"lat\":40.71455,\"lng\":-74.00715},\"waypoints\":[{\"address\":\"Bridgewater Township , New Jersey\"}],\"serviceProvider\":\"here\",\"vehicle\":{\"type\":\"2AxlesTaxi\",\"weight\":{\"value\":20000,\"unit\":\"pound\"},\"height\":{\"value\":7.5,\"unit\":\"meter\"},\"length\":{\"value\":7.5,\"unit\":\"meter\"},\"axles\":4,\"emissionClass\":\"euro_5\"}}"
    const response = await axiosPost(TOLL_TAX_WITH_PATH_URL, data, TOLL_TAX_API_KEY)
    console.log(response, "tool")
  }

  console.log(toValue, fromValue, "tofrom")

  return (
    <div>
      <Row gutter={22}>
        <Col>
          <CustomSearchSelect
            data={location}
            value={toValue}
            setData={setLocation}
            setValue={setToValue}
            placeholder="To"
          />
        </Col>
        <Col>
          {
            isCurrentLocation
              ? <>

              </>
              : <CustomSearchSelect
                data={location}
                value={fromValue}
                setData={setLocation}
                setValue={setFromValue}
                placeholder="From"
              />
          }
        </Col>
        <Col>
          <>
            <p>User Current location</p>
            <Checkbox checked={isCurrentLocation} value={isCurrentLocation} onChange={() => setIsCurrentLocation(!isCurrentLocation)} />
          </>
        </Col>
      </Row>
      <Button className='mt_4' onClick={() => fetchNearest()}>Submit</Button>
    </div>
  )
}

export default SearchContainer