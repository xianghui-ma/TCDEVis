// import * as echarts from 'echarts';
import axios from 'axios';
import {hexbin} from 'd3-hexbin';
import * as d3 from 'd3';

export const drawTaxiMesScatterView = async (url, flagStore, travelType)=>{
    flagStore.current = true;
    let data = await axios.get(url);
    data = data.data[travelType];
    drawSpeedScatter('speedScatterBox', data[2]);
    // drawDistanceScatter('distanceScatterBox', data[1]);
    // drawTimeScatter('timeScatterBox', data[2]);
}

const drawSpeedScatter = (containerId, data)=>{
    let margin = {top: 20, right: 20, bottom: 30, left: 40};
    let canvas = document.getElementById(containerId);
    let radius = 10;
    // 向容器中添加svg画布
    canvas = d3.select(`#${containerId}`)
        .append('svg')
        .attr('width', canvas.offsetWidth)
        .attr('height', canvas.offsetHeight);
    // 定义x比例尺
    let x = d3.scaleLinear()
        .domain(d3.extent(data, d => d[0]))
        .rangeRound([margin.left, canvas.attr('width') - margin.right]);
    // 定义y比例尺
    let y = d3.scaleLinear()
        .domain(d3.extent(data, d => d[1]))
        .rangeRound([canvas.attr('height') - margin.bottom, margin.top]);
    // 定义六边形生成器
    let hexbin_ = hexbin()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .radius(radius * canvas.attr('width') / (canvas.attr('height') - 1))
        .extent([[margin.left, margin.top], [canvas.attr('width') - margin.right, canvas.attr('height') - margin.bottom]]);
    let bins = hexbin_(data);
    // 定义颜色映射
    let color = d3.scaleSequential(d3.interpolateBuPu)
        .domain([0, d3.max(bins, d => d.length) / 2]);
    // 开始绘制
    canvas.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.1)
        .selectAll("path")
        .data(bins)
        .join("path")
        .attr("d", hexbin_.hexagon())
        .attr("transform", d=>`translate(${d[0]},${d[1]})`)
        .attr("fill", d => color(d.length));
}

// export const drawSpeedScatter = (containerId, data)=>{
//     let chart = echarts.init(document.getElementById(containerId));
//     chart.setOption({
//         grid: {
//             left: 1,
//             right: '2.5%',
//             bottom: 1,
//             top: "3.5%"
//         },
//         xAxis: {
//             name: 'Speed',
//             nameGap: -35,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 verticalAlign: 'bottom'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         yAxis: {
//             name: 'Emission',
//             nameGap: -10,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 align: 'left'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         series: [
//             {
//                 symbolSize: 3,
//                 itemStyle: {
//                     color: '#39a6dd'
//                 },
//                 data,
//                 type: 'scatter'
//             }
//         ]
//     });
// }
// export const drawDistanceScatter = (containerId, data)=>{
//     let chart = echarts.init(document.getElementById(containerId));
//     chart.setOption({
//         grid: {
//             left: 1,
//             right: '2.5%',
//             bottom: 1,
//             top: "3.5%"
//         },
//         xAxis: {
//             name: 'Distance',
//             nameGap: -50,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 verticalAlign: 'bottom'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         yAxis: {
//             name: 'Emission',
//             nameGap: -10,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 align: 'left'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         series: [
//             {
//                 symbolSize: 3,
//                 itemStyle: {
//                     color: '#39a6dd'
//                 },
//                 data,
//                 type: 'scatter'
//             }
//         ]
//     });
// }
// export const drawTimeScatter = (containerId, data)=>{
//     let chart = echarts.init(document.getElementById(containerId));
//     chart.setOption({
//         grid: {
//             left: 1,
//             right: '2.5%',
//             bottom: 1,
//             top: "3.5%",
//             containLabel: true
//         },
//         xAxis: {
//             name: 'Time',
//             nameGap: -30,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 verticalAlign: 'bottom'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         yAxis: {
//             name: 'Emission',
//             nameGap: -10,
//             axisTick: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             axisLabel: {
//                 show: true,
//                 inside: true,
//                 color: '#000',
//                 fontWeight: 'bolder'
//             },
//             nameTextStyle: {
//                 color: '#000',
//                 fontWeight: 'bolder',
//                 align: 'left'
//             },
//             splitLine: {
//                 show: false
//             }
//         },
//         series: [
//             {
//                 symbolSize: 3,
//                 itemStyle: {
//                     color: '#39a6dd'
//                 },
//                 data,
//                 type: 'scatter'
//             }
//         ]
//     });
// }