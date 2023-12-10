import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  console.log(props.from, props.to, "from to")
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props?.from?.[0], props?.from?.[1]),
      L.latLng(props?.to?.[0]?.[0], props?.to?.[1]?.[1])
    ],
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;