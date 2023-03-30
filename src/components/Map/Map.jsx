import React, {useEffect} from 'react';

import {loadMap} from './Map.js';

import '@bopen/leaflet-area-selection/dist/index.css';
import './Map.css';

export default function Map() {
  useEffect(()=>{
    loadMap('nanChangMap');
  }, []);
  return (
    <section className='map' id='nanChangMap'></section>
  )
}
