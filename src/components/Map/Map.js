import L from 'leaflet';
import axios from 'axios';
import * as d3 from 'd3';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';

// 加载地图
export const loadMap = (containerId, mapStore)=>{
    let map = L.map(containerId).setView([28.676493, 115.892151], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/smallma/clb4twadj000w15mmqu5b8c5f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA', {
        attribution: '&copy; <a href="https://www.mapbox.com/">mapbox</>'
    }).addTo(map);
    mapStore.current = map;
    map.addControl(new DrawAreaSelection({
        position: 'topleft',
        onPolygonReady: (polygon)=>{
            console.log(JSON.stringify(polygon.toGeoJSON(3), undefined, 2));
        },
        onPolygonDblClick: ()=>{}
    }));
    loadHeatmap(map);
}

// 加载OD热力图
const loadHeatmap = async (map)=>{
    let heatmap = await axios.get('http://localhost:8080/heatmap.json');
    heatmap = heatmap.data;
    // 定义颜色比例尺
    let colorScale = d3.scaleLinear().domain([1, heatmap.max]).range(['#FFFFFF', '#902752']);
    // 添加热力图层
    L.geoJSON(heatmap.geo, {
        style: (feature)=>{
            return {
                fillColor : colorScale(feature.properties.count),
                fillOpacity: 0.8,
                weight: 0
            }
        }
    }).addTo(map);
}