import React, {useEffect, useRef, useState} from 'react';
import pubsub from 'pubsub-js';

import { drawScatter, drawTable, drawBarStatics, drawTimeFrequency } from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    const [table, setTable] = useState([]);

    useEffect(()=>{
        pubsub.subscribe('odMes', (_, data)=>{
            drawScatter('scatterBox', data.scatter);
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
        <section className='mesTable' id='tabelBox'>{drawTable(table)}</section>
    </section>
  );
}