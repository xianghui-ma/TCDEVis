import React, {useEffect, useRef, useState} from 'react';
import pubsub from 'pubsub-js';

import { drawScatter, drawTable, drawBarStatics } from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    const canvasStore = useRef(null);
    const barStore = useRef(null);
    const [table, setTable] = useState([]);

    useEffect(()=>{
        pubsub.subscribe('odMes', (_, data)=>{
            canvasStore.current || drawScatter('scatterBox', canvasStore, data.scatter);
            barStore.current || drawBarStatics('barBox', barStore, data.bar);
            setTable(data.table);
        })
    }, []);
    
    return (
    <section className='odmes'>
        <section className='pathCluster' id='clusterBox'>
            <section className='scatter' id='scatterBox'></section>
            <section className='bar' id='barBox'></section>
        </section>
        <section className='mesTable' id='tabelBox'>{drawTable(table)}</section>
    </section>
  );
}