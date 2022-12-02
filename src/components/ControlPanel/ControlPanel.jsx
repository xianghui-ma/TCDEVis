import React from 'react';
import {Divider, DatePicker, TimePicker, Button, Input} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {} from './ControlPanel.js';
import {travelColors} from '../../color.config.js';

import './ControlPanel.css';

export default function ControlPanel() {
  return (
    <section className='controlPanel'>
      <section className='dateBox'>
        <Divider style={{color: '#777', borderColor: '#777', margin: '0.5em 0'}}>Select Date</Divider>
        <DatePicker size='middle' style={{width: '100%'}}/>
      </section>
      <section className='hourBox'>
        <Divider style={{color: '#777', borderColor: '#777', margin: '0.5em 0'}}>Select Time</Divider>
        <TimePicker.RangePicker format='HH' style={{width: '100%'}}/>
      </section>
      <section className='travelBox'>
        <Divider style={{color: '#777', borderColor: '#777', margin: '0.5em 0'}}>Select Travel</Divider>
        <section className='travelList'>
          {
            travelColors.map((item)=>{
              return <Button style={{backgroundColor: `${Object.values(item)[0]}`, color: '#fff', fontWeight: 600, borderWidth: 0}}>{Object.keys(item)[0]}</Button>;
            })
          }
          <Button>Selected travel</Button>
        </section>
      </section>
      <section className='splitBox'>
        <Divider style={{color: '#777', borderColor: '#777', margin: '0.5em 0'}}>Filter Emission</Divider>
        <section className='rangeList'>
          {
            [1, 2, 3].map((id)=>{
              return <Input.Group compact>
                <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                  }}
                  placeholder="——"
                  disabled
                />
                <Input
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                  placeholder="Maximum"
                />
                <Button type="primary" icon={<SearchOutlined />}/>
              </Input.Group>
            })
          }
        </section>
      </section>
      <section className='apply'><Button type="primary" size='small'>Apply</Button></section>
    </section>
  );
}