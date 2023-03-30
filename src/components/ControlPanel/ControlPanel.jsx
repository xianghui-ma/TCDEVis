import {React, useEffect, useState} from 'react';
import {Divider, DatePicker, TimePicker, Slider, Select, Switch } from 'antd';
import pubsub from 'pubsub-js';

import {initTravelInControlPanel, initSelectTravelType, isShowOdLayer, getMapAndLayers} from './ControlPanel.js';
// import {travelColors, emissionRangeColors} from '../../color.config.js';

import './ControlPanel.css';

export default function ControlPanel() {
  // const odHeatmapAccuracyStore = useRef(200);
  const [heatmapAccuracy, setHeatmapAccuracy] = useState(200);
  useEffect(()=>{
    pubsub.subscribe('outputLayers', getMapAndLayers);
  }, []);
  return (
    <section className='controlPanel'>
      <section className='dateBox'>
        <Divider style={{color: '#777', borderColor: '#777'}}>Select Date</Divider>
        <DatePicker size='middle' style={{width: '100%'}}/>
      </section>
      <section className='hourBox'>
        <Divider style={{color: '#777', borderColor: '#777'}}>Select Time</Divider>
        <TimePicker.RangePicker format='HH' style={{width: '100%'}}/>
      </section>
      <section className='odHeatmap'>
        <Divider style={{color: '#777', borderColor: '#777'}}>OD Heatmap</Divider>
        <section className='heatmapControl'>
          <p>Show/Hidden Layer:</p>
          <Switch checkedChildren="Hidden" unCheckedChildren="Show" defaultChecked style={{ width: '100%', marginTop: '6%', marginBottom: '6%'}} onChange={isShowOdLayer}/>
          <p>Select Travel Type:</p>
          <Select
            defaultValue="Traffic"
            style={{ width: '100%', marginTop: '6%', marginBottom: '6%'}}
            // onChange={handleChange}
            options={initSelectTravelType()}
          />
          <p>OD Heatmap Accuracy:</p>
          <Slider max={500} min={50} onChange={setHeatmapAccuracy} step={50} value={heatmapAccuracy} />
          <p>Display Range:</p>
          <Slider range defaultValue={[20, 169]} max={169} min={1}/>
        </section>
      </section>
      <section className='settingTraj'>
        <Divider style={{color: '#777', borderColor: '#777'}}>CO2 Trajectory</Divider>
        <p>
          <span className='textDescLow'></span>
          <span className='textDesc'>100-200</span>
          <Switch checkedChildren="Hidden" unCheckedChildren="Show" defaultChecked/>
        </p>
        <p>
          <span className='textDescMiddle'></span>
          <span className='textDesc'>200-300</span>
          <Switch checkedChildren="Hidden" unCheckedChildren="Show" defaultChecked/>
        </p>
        <p>
          <span className='textDescHigh'></span> 
          <span className='textDesc'>300-400</span>
          <Switch checkedChildren="Hidden" unCheckedChildren="Show" defaultChecked/>
        </p>
      </section>
      <section className='travelBox'>
        <Divider style={{color: '#777', borderColor: '#777'}}>Travel Colors</Divider>
        <section className='travelList'>
          {initTravelInControlPanel()}
        </section>
      </section>
    </section>
  );
}