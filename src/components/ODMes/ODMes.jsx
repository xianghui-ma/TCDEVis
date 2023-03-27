import React, {useEffect, useRef} from 'react';
import pubsub from 'pubsub-js';

import { drawScatter, drawTable } from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    const canvasStore = useRef(null);

    useEffect(()=>{
        pubsub.subscribe('odMes', (_, data)=>{
            canvasStore.current || drawScatter('scatterBox', canvasStore, data);
        })
    }, []);
    
    return (
    <section className='odmes'>
        <section className='pathCluster' id='clusterBox'>
            <section className='scatter' id='scatterBox'></section>
            <section className='bar'></section>
        </section>
        <section className='mesTable' id='tabelBox'>{drawTable()}</section>
    </section>
  );
}