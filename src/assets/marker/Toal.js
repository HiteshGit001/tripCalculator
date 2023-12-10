import L from 'leaflet';
import RoadTax from "../roadTax.svg"

const iconToal = new L.Icon({
  iconUrl: RoadTax,
  iconRetinaUrl: RoadTax,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: 'leaflet-div-icon'
});

export default iconToal;