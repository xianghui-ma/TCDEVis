import React, {useEffect, useRef} from 'react';

import {drawClusterGraph} from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    const canvasStore = useRef(null);

    useEffect(()=>{
        canvasStore.current || drawClusterGraph('clusterBox', canvasStore);
    }, []);
  
    return (
    <section className='odmes'>
        <section className='pathCluster' id='clusterBox'></section>
        <section className='mesTable' id='tabelBox'></section>
    </section>
  );
}