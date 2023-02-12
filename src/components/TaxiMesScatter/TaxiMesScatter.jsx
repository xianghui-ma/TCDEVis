import {React, useEffect, useRef} from 'react';

import {drawOdMes} from './TaxiMesScatter.js';

import './TaxiMesScatter.css';

export default function ODCluster() {
  const flagStore = useRef(false);
  useEffect(()=>{
    flagStore.current || drawOdMes(flagStore, 'mesBox');
  }, []);
  return (
    <section className='taxiMesScatter' id='mesBox'></section>
  );
}