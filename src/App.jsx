import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "leaflet/dist/leaflet.css";
import './App.css';
import "./sass/index.scss";
import MapContainerBox from './components/MapContainer/MapContainerBox';
import SearchContainer from './components/SearchContainer/SearchContainer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex g_4'>
      <SearchContainer />
      <MapContainerBox />
    </div>
  )
}

export default App
