import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { axiosGet, axiosPost } from '../../util/https.server';
import { Profile, ROOT_URL, TOLL_TAX_API_KEY, TOLL_TAX_WITH_PATH_URL } from '../../api/api';
import RoutingMachine from './RoutingMechanism';
import { AiFillAccountBook } from "react-icons/ai";
import iconToal from '../../assets/marker/Toal';

const MapContainerBox = () => {
  const position = [51.505, -0.09];

  const { from, to } = useSelector((state) => state.nearBy);

  // const fetchRoots = async () => {
  //   try {
  //     const response = await axiosGet(ROOT_URL(Profile.car, "13.388860,52.517037;13.397634,52.529407"));
  //     console.log(response?.data)
  //     if(response?.status===200){

  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchTollTax = async () => {
    const polyLine = from?.[0]?.hint;
    const data = 
    "{\"mapProvider\":\"here\",\"polyline\":\"_f`GwjixRSe@MIIEICGAIA_Al@MHIDe@VKFm@f@SLKLCFEHCF?HAF?NTH\\\\\\\\N`Ab@x@b@`@TZTPLTPZXDFBFXVZTrB~ARDLF~@ZJDTDPBVFJ@X@P@j@?N?d@ERC`@KhB{Al@i@f@Y~BaCPQJKbA_At@s@RSDEBEBCVU~A{ATW~@{@`@_@v@q@p@o@pA_AVSXSJIv@g@~@m@HEROTO@?rA{@VQ^UZSPMHGDEj@g@h@k@f@m@^g@vAqBTYp@_Ab@m@Va@R[Xg@b@u@^{@R]Pc@Vm@Pe@\\\\\\\\cA`@mAn@iB^aAp@aBn@cBt@yAFMP_@pC_GdBsDdAwBRc@fAyB`@y@Ve@pAaCxAqCf@_An@mAjBcE`BoD^w@Vo@P[Xe@JQ`@m@PULQh@o@\\\\\\\\_@l@m@r@m@pAeA`CoBxAoA\\\\\\\\YbAy@?An@i@~AqA`@a@VY^_@V[PSX_@T]T[f@y@JMHMtAcCd@}@f@_AlBoDb@y@r@sAd@{@R]\\\\\\\\o@h@y@Zc@n@_ABENQZc@TY@C\\\\\\\\_@RWFKPUPYT]BCDGl@_Af@w@^u@P_@j@sAh@mAVk@^s@^s@n@kA?Ad@u@fAeBl@eAZg@|@yA`BoCd@_AZo@Z}@J]Ng@BQJe@F_@DS@MDk@J{AFiAHmDHgDFwADiBH_D@[?E@]@c@BgALuEBcABkA@]B{AD_BBa@DaCJkCHiALyAPoAN_ALo@R}@Le@ZkAb@oATo@\\\\\\\\{@FK`@}@`@w@lA{BxAoC~AwCHOZm@l@eAHO^s@n@kAp@qANYL[L]J[Rs@FWNu@Jq@Fc@JiABw@@aBBaDDaA?m@D]\\\\\\\\cCJi@Lg@Pi@Xy@BGDMRg@DIFMHQFMJOr@qAZc@v@mAtAcBz@eANS`BuBtDoEd@m@dBoBj@o@V[LQFGhC{Cp@{@Za@LUJSHOJ[Ne@H]Fc@?AD_@Dg@@e@?I?M?M?aA?{@A}BCwA?oA?YEuB?k@Ag@C{@?A?ECs@AyA?m@ASC{CEmCA}@AYAW?KA}@CcBA{AAcA?WAUGiI?S?QAU?WAc@AgA?_@@a@@y@@e@@UBU@UVaD@MFaABc@@Y@G?i@Ak@Gk@EUI_@IY?AIUKUISQc@s@}AMWk@uAK[GOIa@I_@EYCQGm@Co@A]?M?O@]@UD[Fa@D]FWLk@Pg@N]P_@N[dBaDpBkD@AdCsEbAkBd@_APa@HUHUVaAES?EAE?E?EJ_ADk@@W@UEaAAOIm@M_ABCKa@CMESA?EMK[KWCIACAAKWs@sAq@gAEIEGS[S]GMGKWa@g@mAe@eA]OSIEAG?WAG@OBIBGDGF[b@IJKFk@`Au@pA}@~AMXcC~E_BnCY`@MT\",\"locTimes\":[[0,1660110342],[30,1660110642],[60,1660110942],[232,1660111182]],\"vehicle\":{\"type\":\"2AxlesTaxi\",\"weight\":{\"value\":20000,\"unit\":\"pound\"},\"height\":{\"value\":7.5,\"unit\":\"meter\"},\"length\":{\"value\":7.5,\"unit\":\"meter\"},\"axles\":4,\"emissionClass\":\"euro_5\"},\"fuelOptions\":{\"fuelCost\":{\"value\":1.305,\"units\":\"USD/gallon\",\"currency\":\"USD\",\"fuelUnit\":\"gallon\"},\"fuelEfficiency\":{\"city\":28.57,\"hwy\":22.4,\"units\":\"mpg\"}},\"units\":{\"currency\":\"USD\"},\"departure_time\":1609507347}"
    const response = await axiosPost(TOLL_TAX_WITH_PATH_URL, data, TOLL_TAX_API_KEY)
    console.log(response,"tool")
  }

  useEffect(() => {
    // fetchRoots()
    fetchTollTax();
  }, [])

  console.log(from, to, "pppppe")
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "500px", minWidth: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        from?.length && to?.length
          ? <RoutingMachine from={from} to={to?.map((ele) => ele?.location)} />
          : <></>
      }
      {
        to?.length ?
          to?.map((ele) => {
            return (
              <Marker position={ele?.location}>
                <Popup>
                  {ele?.name}
                </Popup>
              </Marker>
            )
          })
          : <></>
      }
    </MapContainer>
  )
}

export default MapContainerBox