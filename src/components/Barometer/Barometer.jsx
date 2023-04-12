import {React, useEffect, useRef} from 'react';
import {Button} from 'antd';
import {ArrowsAltOutlined} from '@ant-design/icons';

import {initChart, modelToggle} from './Barometer.js';

import './Barometer.css';

export default function Barometer() {
  const statusStore = useRef(null);
  useEffect(()=>{
    statusStore.current || initChart(statusStore);
  }, []);

  return (
    <section className='barometer'>
      <section className='toggleModel'>
        <Button icon={<ArrowsAltOutlined />} size='small' style={{marginLeft: '10em', height: '20px', width: '20px'}} onClick={modelToggle('speed', 'Speed(m/s)', statusStore)}/>
        <Button icon={<ArrowsAltOutlined />} size='small' style={{marginLeft: '10em', height: '20px', width: '20px'}} onClick={modelToggle('distance', 'Distance(km)', statusStore)}/>
        <Button icon={<ArrowsAltOutlined />} size='small' style={{marginLeft: '5em', height: '20px', width: '20px'}} onClick={modelToggle('time', 'Time(h)', statusStore)}/>
        <Button icon={<ArrowsAltOutlined />} size='small' style={{marginLeft: '5em', height: '20px', width: '20px'}} onClick={modelToggle('co2', 'CO2(kg)', statusStore)}/>
      </section>
      <section className='chartBox'>
        <section id='speed' className='speedBox'></section>
        <section id='distance' className='distanceBox'></section>
        <section id='time' className='timeBox'></section>
        <section id='co2' className='co2Box'></section>
      </section>
    </section>
  );
}