import L from 'leaflet';

// 加载地图
export const loadMap = (containerId, mapStore)=>{
    let map = L.map(containerId).setView([28.676493, 115.892151], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/smallma/clb4twadj000w15mmqu5b8c5f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA', {
        attribution: '&copy; <a href="https://www.mapbox.com/">mapbox</>'
    }).addTo(map);
    mapStore.current = map;
}