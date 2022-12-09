import {React, useEffect, useRef} from 'react';

import {drawTaxiMesScatterView} from './TaxiMesScatter.js';

import './TaxiMesScatter.css';

export default function TaxiMesScatter() {
  const flagStore = useRef(false);
  useEffect(()=>{
    flagStore.current || drawTaxiMesScatterView('http://127.0.0.1:8080/taxiMesAndEmission.json', flagStore, 7, ['speedScatterBox', 'distanceScatterBox', 'timeScatterBox']);
  }, []);
  return (
    <section className='taxiMesScatter'>
      <section className='speedScatter' id='speedScatterBox'></section>
      <section className='distanceScatter' id='distanceScatterBox'></section>
      <section className='timeScatter' id='timeScatterBox'></section>
    </section>
  );
}