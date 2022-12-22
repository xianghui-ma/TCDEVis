import React, {useEffect, useRef} from 'react';

import {loadMap} from './Map.js';

import '@bopen/leaflet-area-selection/dist/index.css';
import './Map.css';

export default function Map() {
  const mapStore = useRef(null);
  useEffect(()=>{
    mapStore.current || loadMap('nanChangMap', mapStore);
  }, []);
  return (
    <section className='map' id='nanChangMap'></section>
  )
}
