import {React, useEffect} from 'react';

import {drawSpeedScatter, drawDistanceScatter, drawTimeScatter} from './TaxiMesScatter.js';

import './TaxiMesScatter.css';

export default function TaxiMesScatter() {
  useEffect(()=>{
    drawSpeedScatter('speedScatterBox');
    drawDistanceScatter('distanceScatterBox');
    drawTimeScatter('timeScatterBox');
  }, []);
  return (
    <section className='taxiMesScatter'>
      <section className='speedScatter' id='speedScatterBox'></section>
      <section className='distanceScatter' id='distanceScatterBox'></section>
      <section className='timeScatter' id='timeScatterBox'></section>
    </section>
  );
}