import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { axiosGet } from '../../util/https.server';
import { Profile, ROOT_URL } from '../../api/api';
import RoutingMachine from './RoutingMechanism';

const MapContainerBox = () => {
  const position = [51.505, -0.09];

  const { from, to } = useSelector((state) => state.nearBy);

  const fetchRoots = async () => {
    const response = await axiosGet(ROOT_URL(Profile.car, "13.388860,52.517037;13.397634,52.529407"));
    console.log(response?.data)
  }

  useEffect(() => {
    fetchRoots()
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