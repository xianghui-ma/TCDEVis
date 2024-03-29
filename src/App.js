import Barometer from './components/Barometer/Barometer.jsx';
import ControlPanel from './components/ControlPanel/ControlPanel.jsx';
import Map from './components/Map/Map.jsx';
import ODMes from './components/ODMes/ODMes.jsx';
import TravelEmissionVary from './components/TravelEmissionVary/TravelEmissionVary.jsx';
import SystemHeader from './components/SystemHeader/SystemHeader.jsx';

import './App.css';

function App() {
  return (
    <section className="app">
      <Barometer/>
      <ControlPanel/>
      <Map/>
      <ODMes/>
      <TravelEmissionVary/>
      <SystemHeader/>
    </section>
  );
}

export default App;