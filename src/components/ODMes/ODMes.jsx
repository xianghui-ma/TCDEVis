import React, {useEffect} from 'react';

import {drawParallel, drawBar} from './ODMes.js';

import './ODMes.css';

export default function ODMes() {
    useEffect(()=>{
        drawParallel('parallelBox');
        drawBar('barBox');
    }, []);
  
    return (
    <section className='odmes'>
        <section className='parallel' id='parallelBox'></section>
        <section className='bar' id='barBox'></section>
    </section>
  );
}