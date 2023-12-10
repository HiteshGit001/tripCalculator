import React, { useEffect, useState } from 'react'
import { axiosGet, axiosPost } from '../../util/https.server'
import { NEAREST_URL, OPEN_WEATHER_GEO_LOC_URL, ORSM_URL, Profile, TOLL_TAX_API_KEY, TOLL_TAX_WITH_PATH_URL } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateFrom, updateTo } from '../../store/NearBySlice'

import CustomSearchSelect from '../../custom/CustomSelect'
import { Button, Checkbox, Col, Row, Switch } from 'antd'
import axios from 'axios';
import PolylineUtil from 'polyline-encoded'

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
            setFromValue([position.coords.latitude, position.coords.longitude])
            dispatch(updateFrom([position.coords.latitude, position.coords.longitude]))
          })
          : dispatch(updateFrom(JSON.parse(fromValue)));
        fetchTollTax(response?.data?.waypoints, fromValue)
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

  const fetchTollTax = async (wayPoint, from) => {
    // console.log(wayPoint, "fetchTax")
    // const polyLine = wayPoint?.[0]?.hint;
    // const data = "{\"mapProvider\":\"here\",\"polyline\":\"_f`GwjixRSe@MIIEICGAIA_Al@MHIDe@VKFm@f@SLKLCFEHCF?HAF?NTH\\\\\\\\N`Ab@x@b@`@TZTPLTPZXDFBFXVZTrB~ARDLF~@ZJDTDPBVFJ@X@P@j@?N?d@ERC`@KhB{Al@i@f@Y~BaCPQJKbA_At@s@RSDEBEBCVU~A{ATW~@{@`@_@v@q@p@o@pA_AVSXSJIv@g@~@m@HEROTO@?rA{@VQ^UZSPMHGDEj@g@h@k@f@m@^g@vAqBTYp@_Ab@m@Va@R[Xg@b@u@^{@R]Pc@Vm@Pe@\\\\\\\\cA`@mAn@iB^aAp@aBn@cBt@yAFMP_@pC_GdBsDdAwBRc@fAyB`@y@Ve@pAaCxAqCf@_An@mAjBcE`BoD^w@Vo@P[Xe@JQ`@m@PULQh@o@\\\\\\\\_@l@m@r@m@pAeA`CoBxAoA\\\\\\\\YbAy@?An@i@~AqA`@a@VY^_@V[PSX_@T]T[f@y@JMHMtAcCd@}@f@_AlBoDb@y@r@sAd@{@R]\\\\\\\\o@h@y@Zc@n@_ABENQZc@TY@C\\\\\\\\_@RWFKPUPYT]BCDGl@_Af@w@^u@P_@j@sAh@mAVk@^s@^s@n@kA?Ad@u@fAeBl@eAZg@|@yA`BoCd@_AZo@Z}@J]Ng@BQJe@F_@DS@MDk@J{AFiAHmDHgDFwADiBH_D@[?E@]@c@BgALuEBcABkA@]B{AD_BBa@DaCJkCHiALyAPoAN_ALo@R}@Le@ZkAb@oATo@\\\\\\\\{@FK`@}@`@w@lA{BxAoC~AwCHOZm@l@eAHO^s@n@kAp@qANYL[L]J[Rs@FWNu@Jq@Fc@JiABw@@aBBaDDaA?m@D]\\\\\\\\cCJi@Lg@Pi@Xy@BGDMRg@DIFMHQFMJOr@qAZc@v@mAtAcBz@eANS`BuBtDoEd@m@dBoBj@o@V[LQFGhC{Cp@{@Za@LUJSHOJ[Ne@H]Fc@?AD_@Dg@@e@?I?M?M?aA?{@A}BCwA?oA?YEuB?k@Ag@C{@?A?ECs@AyA?m@ASC{CEmCA}@AYAW?KA}@CcBA{AAcA?WAUGiI?S?QAU?WAc@AgA?_@@a@@y@@e@@UBU@UVaD@MFaABc@@Y@G?i@Ak@Gk@EUI_@IY?AIUKUISQc@s@}AMWk@uAK[GOIa@I_@EYCQGm@Co@A]?M?O@]@UD[Fa@D]FWLk@Pg@N]P_@N[dBaDpBkD@AdCsEbAkBd@_APa@HUHUVaAES?EAE?E?EJ_ADk@@W@UEaAAOIm@M_ABCKa@CMESA?EMK[KWCIACAAKWs@sAq@gAEIEGS[S]GMGKWa@g@mAe@eA]OSIEAG?WAG@OBIBGDGF[b@IJKFk@`Au@pA}@~AMXcC~E_BnCY`@MT\",\"locTimes\":[[0,1660110342],[30,1660110642],[60,1660110942],[232,1660111182]],\"vehicle\":{\"type\":\"2AxlesTaxi\",\"weight\":{\"value\":20000,\"unit\":\"pound\"},\"height\":{\"value\":7.5,\"unit\":\"meter\"},\"length\":{\"value\":7.5,\"unit\":\"meter\"},\"axles\":4,\"emissionClass\":\"euro_5\"},\"fuelOptions\":{\"fuelCost\":{\"value\":1.305,\"units\":\"USD/gallon\",\"currency\":\"USD\",\"fuelUnit\":\"gallon\"},\"fuelEfficiency\":{\"city\":28.57,\"hwy\":22.4,\"units\":\"mpg\"}},\"units\":{\"currency\":\"USD\"},\"departure_time\":1609507347}"
    // const response = await axiosPost(TOLL_TAX_WITH_PATH_URL, data, TOLL_TAX_API_KEY)
    // console.log(response, "tool")
    console.log(from, "tax from");
    fetchData(from)
  }

  console.log(toValue, fromValue, TOLL_TAX_API_KEY, "tofrom")
  const fetchData = async (from) => {
    try {
      // const data = {
      // mapProvider: 'here',
      // polyline:
      // //  PolylineUtil.encode([from, JSON.parse(toValue)], []),
      // '_f`GwjixRSe@MIIEICGAIA_Al@MHIDe@VKFm@f@SLKLCFEHCF?HAF?NTH\\\\\\\\N`Ab@x@b@`@TZTPLTPZXDFBFXVZTrB~ARDLF~@ZJDTDPBVFJ@X@P@j@?N?d@ERC`@KhB{Al@i@f@Y~BaCPQJKbA_At@s@RSDEBEBCVU~A{ATW~@{@`@_@v@q@p@o@pA_AVSXSJIv@g@~@m@HEROTO@?rA{@VQ^UZSPMHGDEj@g@h@k@f@m@^g@vAqBTYp@_Ab@m@Va@R[Xg@b@u@^{@R]Pc@Vm@Pe@\\\\\\\\cA`@mAn@iB^aAp@aBn@cBt@yAFMP_@pC_GdBsDdAwBRc@fAyB`@y@Ve@pAaCxAqCf@_An@mAjBcE`BoD^w@Vo@P[Xe@JQ`@m@PULQh@o@\\\\\\\\_@l@m@r@m@pAeA`CoBxAoA\\\\\\\\YbAy@?An@i@~AqA`@a@VY^_@V[PSX_@T]T[f@y@JMHMtAcCd@}@f@_AlBoDb@y@r@sAd@{@R]\\\\\\\\o@h@y@Zc@n@_ABENQZc@TY@C\\\\\\\\_@RWFKPUPYT]BCDGl@_Af@w@^u@P_@j@sAh@mAVk@^s@^s@n@kA?Ad@u@fAeBl@eAZg@|@yA`BoCd@_AZo@Z}@J]Ng@BQJe@F_@DS@MDk@J{AFiAHmDHgDFwADiBH_D@[?E@]@c@BgALuEBcABkA@]B{AD_BBa@DaCJkCHiALyAPoAN_ALo@R}@Le@ZkAb@oATo@\\\\\\\\{@FK`@}@`@w@lA{BxAoC~AwCHOZm@l@eAHO^s@n@kAp@qANYL[L]J[Rs@FWNu@Jq@Fc@JiABw@@aBBaDDaA?m@D]\\\\\\\\cCJi@Lg@Pi@Xy@BGDMRg@DIFMHQFMJOr@qAZc@v@mAtAcBz@eANS`BuBtDoEd@m@dBoBj@o@V[LQFGhC{Cp@{@Za@LUJSHOJ[Ne@H]Fc@?AD_@Dg@@e@?I?M?M?aA?{@A}BCwA?oA?YEuB?k@Ag@C{@?A?ECs@AyA?m@ASC{CEmCA}@AYAW?KA}@CcBA{AAcA?WAUGiI?S?QAU?WAc@AgA?_@@a@@y@@e@@UBU@UVaD@MFaABc@@Y@G?i@Ak@Gk@EUI_@IY?AIUKUISQc@s@}AMWk@uAK[GOIa@I_@EYCQGm@Co@A]?M?O@]@UD[Fa@D]FWLk@Pg@N]P_@N[dBaDpBkD@AdCsEbAkBd@_APa@HUHUVaAES?EAE?E?EJ_ADk@@W@UEaAAOIm@M_ABCKa@CMESA?EMK[KWCIACAAKWs@sAq@gAEIEGS[S]GMGKWa@g@mAe@eA]OSIEAG?WAG@OBIBGDGF[bIJKFk@`Au@pA}@~AMXcC~E_BnCY`@MT',
      // locTimes: [
      //   [0, 1660110342],
      //   [30, 1660110642],
      //   [60, 1660110942],
      //   [232, 1660111182],
      // ],
      // vehicle: {
      //   type: '2AxlesTaxi',
      //   weight: { value: 20000, unit: 'pound' },
      //   height: { value: 7.5, unit: 'meter' },
      //   length: { value: 7.5, unit: 'meter' },
      //   axles: 4,
      //   emissionClass: 'euro_5',
      // },
      // fuelOptions: {
      //   fuelCost: {
      //     value: 1.305,
      //     units: 'USD/gallon',
      //     currency: 'USD',
      //     fuelUnit: 'gallon',
      //   },
      //   fuelEfficiency: { city: 28.57, hwy: 22.4, units: 'mpg' },
      // },
      // units: { currency: 'USD' },
      // departure_time: 1609507347,
      // "polyline": "_p~iF~ps|U_ulLnnqC_mqNvxq`@"
      // };
      // const response = await axios.post(TOLL_TAX_WITH_PATH_URL, data, { headers: { "Content-Type": "application/json", "x-api-key": "Jn6NjjMjH7pd9GTQTG4TTR8dBdF8rPdg" } })
      // await axiosPost(TOLL_TAX_WITH_PATH_URL, data, TOLL_TAX_API_KEY)
      // console.log(response.data);

      const data = JSON.stringify({
        "polyline": "_p~iF~ps|U_ulLnnqC_mqNvxq`@"
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: TOLL_TAX_WITH_PATH_URL,
        headers: {
          'x-api-key': TOLL_TAX_API_KEY,
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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