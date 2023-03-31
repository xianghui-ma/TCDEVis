import React, {useEffect, useRef, useState} from 'react';
import pubsub from 'pubsub-js';

import { drawScatter, drawTable, drawBarStatics, drawTimeFrequency } from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    const [table, setTable] = useState([]);
    const mapStore = useRef(null);

    useEffect(()=>{
        pubsub.subscribe('outputLayers', (_, data)=>{
            if(data.map){
                mapStore.current = data.map;
            }
        });
        pubsub.subscribe('odMes', (_, data)=>{
            drawScatter('scatterBox', data.scatter, data.scatterPath, mapStore);
            drawBarStatics('barBox', data.bar);
            drawTimeFrequency('timeBox', data.hot);
            setTable(data.table);
        });
    }, []);
    
    return (
    <section className='odmes'>
        <section className='pathCluster' id='clusterBox'>
            <section className='scatter' id='scatterBox'></section>
            <section className='timeAndNum'>
                <section className='time' id='timeBox'></section>
                <section className='bar' id='barBox'></section>
            </section>
        </section>
        <section className='mesTable' id='tabelBox'>{drawTable(table, mapStore)}</section>
    </section>
  );
}