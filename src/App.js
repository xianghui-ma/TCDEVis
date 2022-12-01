import Barometer from './components/Barometer/Barometer.jsx';
import ControlPanel from './components/ControlPanel/ControlPanel.jsx';
import Map from './components/Map/Map.jsx';
import ODFlow from './components/ODFlow/ODFlow.jsx';
import TaxiMesScatter from './components/TaxiMesScatter/TaxiMesScatter.jsx';
import TravelEmissionVary from './components/TravelEmissionVary/TravelEmissionVary.jsx';
import SystemHeader from './components/SystemHeader/SystemHeader.jsx';

import './App.css';

function App() {
  return (
    <section className="App">
      <Barometer/>
      <ControlPanel/>
      <Map/>
      <ODFlow/>
      <TaxiMesScatter/>
      <TravelEmissionVary/>
      <SystemHeader/>
    </section>
  );
}

export default App;
