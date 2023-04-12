import React, {useEffect} from 'react';
import pubsub from 'pubsub-js';

import {loadMap, loadSingleTravel} from './Map.js';

import '@bopen/leaflet-area-selection/dist/index.css';
import './Map.css';

export default function Map() {
  useEffect(()=>{
    loadMap('nanChangMap');
    pubsub.subscribe('travelType', loadSingleTravel);
  }, []);
  return (
    <section className='map' id='nanChangMap'></section>
  )
}
