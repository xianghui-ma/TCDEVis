import L from 'leaflet';
import axios from 'axios';
import * as d3 from 'd3';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';
import pubsub from 'pubsub-js';

let selectedAreaArray = [];
let selectedAreaJson = [];

// 清除选取图层
const clearSelectedAreaLayer = (map)=>{
    selectedAreaArray.forEach((item)=>{
        map.removeLayer(item);
    });
    selectedAreaArray = [];
    selectedAreaJson = [];
}

// 添加所选区域
const addSelectedArea = (map, selectedArea)=>{
    selectedAreaJson.push(selectedArea.geometry.coordinates[0]);
    selectedAreaArray.push(
        L.geoJSON(selectedArea, {
            style: {
                weight: 0
            }
        }).addTo(map)
    );
}

// 添加清除按钮
const addClearButton = (map)=>{
    L.Control.ClearButton = L.Control.extend({
        onAdd: ()=>{
            let clearButton = L.DomUtil.create('img');
            clearButton.src = './clear.png';
            clearButton.style.width = '32px';
            clearButton.style.height = '32px';
            clearButton.style.borderRadius = '10%';
            clearButton.style.border = '1px solid #ccc';
            clearButton.style.backgroundColor = '#fff';
            clearButton.style.cursor = 'pointer';
            L.DomEvent.on(clearButton, 'click', ()=>{
                clearSelectedAreaLayer(map);
            });
            return clearButton;
        }
    });
    L.control.clearButton = (opts)=>{
        return new L.Control.ClearButton(opts);
    }
    L.control.clearButton({ position: 'topleft' }).addTo(map);
}

// 添加查询按钮
const addSearchButton = (map)=>{
    L.Control.SearchButton = L.Control.extend({
        onAdd: ()=>{
            let searchButton = L.DomUtil.create('img');
            searchButton.src = './search.png';
            searchButton.style.width = '32px';
            searchButton.style.height = '32px';
            searchButton.style.borderRadius = '10%';
            searchButton.style.border = '1px solid #ccc';
            searchButton.style.backgroundColor = '#fff';
            searchButton.style.cursor = 'pointer';
            L.DomEvent.on(searchButton, 'click', ()=>{
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/odPathSearch',
                    data: {
                        startArea: selectedAreaJson[0],
                        endArea: selectedAreaJson[1]
                    }
                }).then((response)=>{
                    pubsub.publish('odMes', response.data);
                });
            });
            return searchButton;
        }
    });
    L.control.searchButton = (opts)=>{
        return new L.Control.SearchButton(opts);
    }
    L.control.searchButton({ position: 'topleft' }).addTo(map);
}

// 加载地图
export const loadMap = (containerId)=>{
    let map = L.map(containerId).setView([28.676493, 115.892151], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/smallma/clb4twadj000w15mmqu5b8c5f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA', {
        attribution: '&copy; <a href="https://www.mapbox.com/">mapbox</>'
    }).addTo(map);
    let selectedArea = null;
    map.addControl(new DrawAreaSelection({
        position: 'topleft',
        onPolygonReady: (polygon)=>{
            selectedArea = polygon.toGeoJSON(3);
            // selectedArea = JSON.stringify(polygon.toGeoJSON(3), undefined, 2);
        },
        onButtonDeactivate: ()=>{
            addSelectedArea(map, selectedArea);
        }
    }));
    addClearButton(map);
    addSearchButton(map);
    loadHeatmap(map);
    pubsub.publish('outputLayers', {map});
}

// 加载OD热力图
const loadHeatmap = async (map)=>{
    let heatmap = await axios.get('http://localhost:8080/heatmap.json');
    heatmap = heatmap.data;
    // 定义颜色比例尺
    let colorScale = d3.scaleLinear().domain([1, heatmap.max]).range(['#FFFFFF', '#902752']);
    // 添加热力图层
    let odHeatmapLayer = L.geoJSON(heatmap.geo, {
        style: (feature)=>{
            return {
                fillColor : colorScale(feature.properties.count),
                fillOpacity: 0.8,
                weight: 0
            }
        }
    }).addTo(map);
    pubsub.publish('outputLayers', {odHeatmapLayer});
}