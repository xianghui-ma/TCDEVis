import axios from 'axios';
import * as d3 from 'd3';
import L from 'leaflet';

export const drawOdMes = async (store, containerId)=>{
    let heatmap = await axios.get('http://localhost:8080/heatmap.json');
    heatmap = heatmap.data;
    // 定义颜色比例尺
    let colorScale = d3.scaleLinear().domain([1, 169]).range(['#FFFFFF', '#8E2752']);
    // 添加热力图层

    store.current = true;
    let roadJson = await axios.get('http://127.0.0.1:8080/南昌市.json');
    roadJson = roadJson.data;
    let containerEle = document.getElementById(containerId);
    let canvas = d3.select(`#${containerId}`)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
    // 定义地图投影
    console.log(containerEle.offsetWidth / 2, containerEle.offsetHeight / 2);
    let projection = d3.geoMercator()
        .center([115.892151, 28.676493])
        .scale(100)
        .translate([containerEle.offsetWidth / 2, containerEle.offsetHeight / 2]);
    // 定义地理路径生成器
    let path = d3.geoPath()
        .projection(projection);
    // 绘制地图
    canvas.append('g')
        .selectAll('path')
        .data(roadJson.features)
        .enter()
        .append('path')
        // .attr('stroke', '#aaa')
        // .attr('stroke-width', '1px')
        // .style('fill', '#fff')
        .attr('d', path);
}