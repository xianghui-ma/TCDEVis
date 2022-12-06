import {React, useEffect, useRef} from 'react';

import {drawFrequencyOfTravel, drawRadialAreaOfEmission} from './TravelEmissionVary.js';

import './TravelEmissionVary.css';

export default function TravelEmissionVary() {
  const canvasStore = useRef(null);
  useEffect(()=>{
    if(!canvasStore.current){
      drawFrequencyOfTravel('canvas', canvasStore);
      drawRadialAreaOfEmission(canvasStore.current);
    }
  }, []);

  return (
    <section className='travelEmissionVary' id='canvas'></section>
  );
}