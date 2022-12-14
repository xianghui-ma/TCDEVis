import L from 'leaflet';
import * as turf from '@turf/turf';
import axios from 'axios';

// 加载地图
export const loadMap = (containerId, mapStore)=>{
    let map = L.map(containerId).setView([28.676493, 115.892151], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/smallma/clb4twadj000w15mmqu5b8c5f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA', {
        attribution: '&copy; <a href="https://www.mapbox.com/">mapbox</>'
    }).addTo(map);
    mapStore.current = map;
    // drawVoronoi(map);
}

const drawVoronoi = async (map)=>{
    let mask = await axios.get('http://127.0.0.1:8080/南昌市_边界.json');
    mask = mask.data;
    let result = {
        "type": "FeatureCollection",
        "features": []
    }
    var options = {
        // bbox: [-70, 40, -60, 60]
        bbox: [115, 28, 116.6, 29.2]
      };
    var points = turf.points([[115.85, 28.68],
        [115.9, 28.68],
        [115.87, 28.67],
        [115.92, 28.63],
        [115.73, 28.72],
        [115.95, 28.68],
        [115.93, 28.55],
        [115.82, 28.7],
        [115.55, 28.85],
        [116.27, 28.37]]);
    var voronoiPolygons = turf.voronoi(points, options);
    voronoiPolygons.features.forEach((item)=>{
        result.features.push(turf.intersect(item.geometry, mask.features[0].geometry));
    })
    L.geoJSON(result).addTo(map);
}