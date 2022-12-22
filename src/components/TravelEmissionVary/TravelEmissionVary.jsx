import {React, useEffect, useRef} from 'react';

import {drawFrequencyOfTravel, drawRadialAreaOfEmission, drawGrid} from './TravelEmissionVary.js';

import './TravelEmissionVary.css';

export default function TravelEmissionVary() {
  const canvasStore = useRef(null);
  useEffect(()=>{
    canvasStore.current || drawGrid('canvas', canvasStore);
    // if(!canvasStore.current){
    //   drawFrequencyOfTravel('canvas', canvasStore);
    //   drawRadialAreaOfEmission(canvasStore.current);
    // }
  }, []);

  return (
    <section className='travelEmissionVary' id='canvas'></section>
  );
}