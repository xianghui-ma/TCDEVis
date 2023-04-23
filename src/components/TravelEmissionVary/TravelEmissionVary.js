import * as d3 from 'd3';
import axios from 'axios';

export const drawGrid = async (containerId, store)=>{
    let frequencyOfTravel = await axios.get('http://localhost:8080/frequencyOfTravel.json');
    let emissionOfTravel = await axios.get('http://localhost:8080/emissionOfTravel.json');
    frequencyOfTravel = frequencyOfTravel.data;
    emissionOfTravel = emissionOfTravel.data;
    // 出行类型
    const travelType = ['Traffic', 'Shop', 'Dining', 'Service', 'Pastime', 'Medical', 'Hotel', 'Home', 'Work', 'School', 'Other'];
    // 选择DOM容器
    let canvas = document.getElementById(containerId);
    // 向容器中添加svg画布
    canvas = d3.select(`#${containerId}`)
        .append('svg')
        .attr('width', canvas.offsetWidth)
        .attr('height', canvas.offsetHeight);
    // 计算每个单元格的宽高
    let width = canvas.attr('width') / 5;
    let height = canvas.attr('height') / 2;
    // 单元格数组
    let cellArr = [];
    // 排列第一排的单元格
    for(let i = 0; i < 5; i++){
        cellArr.push(
            canvas.append('g')
                .attr('transform', `translate(${(width / 2) + (i * width)}, ${height / 2})`)
        );
    }
    // 排列第二排的单元格
    for(let i = 0; i < 5; i++){
        cellArr.push(
            canvas.append('g')
                .attr('transform', `translate(${(width / 2) + (i * width)}, ${height / 2 + height})`)
        );
    }
    // 开始绘制
    cellArr.forEach((item, index)=>{
        drawFrequencyOfTravel(width, item, frequencyOfTravel[index + 1]);
        drawRadialAreaOfEmission(item, travelType[index], emissionOfTravel[index + 1]);
    });
    store.current = canvas;
}

// 绘制外圈的各时段出行频次柱状图
const drawFrequencyOfTravel = (width, g, data)=>{
    const INNERRADIUS = 50;
    const AXISMARKARR = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    // // 发送请求，获取数据
    // let data = [0, 0, 0, 0, 0, 0, 0, 3411, 2960, 3312, 3339, 3530, 3119, 3012, 3179, 2963, 2899, 2639, 3194, 3115, 3184, 3072, 2701, 2283]

    // 定义线性比例尺
    let linearScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([INNERRADIUS, (width - 18) / 2])

    // 添加组元素g，包裹出行频次柱状图
    let frequencyBarG = g.append('g');
    // 绘制圆弧
    let arcPathArr = [];
    data.forEach((item, index)=>{
        arcPathArr.push(
            d3.arc()
                .innerRadius(INNERRADIUS)
                .outerRadius(linearScale(item))
                .startAngle((index * 15) * (Math.PI / 180))
                .endAngle((index * 15 + 15) * (Math.PI / 180))
                .padAngle(0.02)
        );
    });
    frequencyBarG.selectAll('path')
        .data(arcPathArr)
        .join('path')
        .attr('d', (d)=>{
            return d();
        })
        .attr('fill', '#39a6dd');

    // 添加组元素g，包裹刻度
    let axisG = g.append('g');
    // 绘制刻度
    let axisMark = null;
    AXISMARKARR.forEach((item)=>{
        axisMark = axisG.append('g')
            .attr('transform', `rotate(${-90 + item * 15}) translate(${INNERRADIUS}, 0)`);
        axisMark.append('line')
            .attr('x2', -5)
            .attr('stroke', '#000')
            .attr('stroke-width', '1.5px');
        axisMark.append('text')
            .attr("text-anchor", "middle")
            .attr('transform', 'rotate(90) translate(0, 12)')
            .attr('font-size', '0.6rem')
            .text(`${item}h`);
    })
}

// 绘制内圈的各时段排放径向面积图
const drawRadialAreaOfEmission = (g, title, data)=>{
    const OUTTERRADIUS = 50;
    const INNERRADIUS = 25;
    // 定义线性比例尺
    let linearScale = d3.scaleLinear()
        .domain([0, data.max])
        .range([INNERRADIUS, OUTTERRADIUS])
    // 绘制最大值径向面积
    let arcPath = d3.arc()
        .innerRadius(INNERRADIUS)
        .outerRadius(OUTTERRADIUS);
    g.append('g')
        .append('path')
        .attr('d', arcPath({startAngle: 0, endAngle: 2 * Math.PI}))
        .attr('fill', '#39a6dd')
        .attr('fill-opacity', 0.2);
    // 绘制平均排放线
    g.append('g')
        .append('circle')
        .attr("cx", g.attr('width') / 2)
        .attr("cy", g.attr('height') / 2)
        .attr("r", linearScale(data.average))
        .attr('stroke', '#39a6dd')
        .attr('stroke-width', '2px')
        .attr("stroke-dasharray", 8 + " " + 4)
        .attr("fill", "none"); 
    // 平分角度
    let angles = d3.range(0, 2 * Math.PI, Math.PI / 48);
    // 创建径向面积生成器
    let area = d3.areaRadial()
        .curve(d3.curveLinearClosed)
        .angle((d) => { return d })
        .innerRadius(INNERRADIUS)
        .outerRadius((d, i) => { return linearScale(data.emission[i]) });
    // 开始绘制
    g.append('g')
        .append('path')
        .attr('d', area(angles))
        .attr("fill", "#39a6dd")
        .attr("fill-opacity", 0.7);
    // 绘制旅行目的文字
    g.append('g')
        .append('text')
        .attr("text-anchor", "middle")
        .attr('font-size', '0.9rem')
        .attr('font-weight', 600)
        .attr('color', '#aaa')
        .text(title);
}

// // 绘制外圈的各时段出行频次柱状图
// export const drawFrequencyOfTravel = (canvasId, canvasStore)=>{
//     const INNERRADIUS = 100;
//     const AXISMARKARR = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
//     // 发送请求，获取数据
//     let mockData = [0, 0, 0, 0, 0, 0, 0, 3411, 2960, 3312, 3339, 3530, 3119, 3012, 3179, 2963, 2899, 2639, 3194, 3115, 3184, 3072, 2701, 2283]
//     // 选择DOM容器
//     let canvas = document.getElementById(canvasId);
//     // 向容器中添加svg画布
//     canvas = d3.select(`#${canvasId}`)
//         .append('svg')
//         .attr('width', canvas.offsetWidth)
//         .attr('height', canvas.offsetHeight - 1);

//     // 定义线性比例尺
//     let linearScale = d3.scaleLinear()
//         .domain([0, d3.max(mockData)])
//         .range([INNERRADIUS, canvas.attr('height') / 2])

//     // 添加组元素g，包裹出行频次柱状图
//     let frequencyBarG = canvas.append('g')
//         .attr('transform', `translate(${canvas.attr('width') / 2}, ${canvas.attr('height') / 2})`);
//     // 绘制圆弧
//     let arcPathArr = [];
//     mockData.forEach((item, index)=>{
//         arcPathArr.push(
//             d3.arc()
//                 .innerRadius(INNERRADIUS)
//                 .outerRadius(linearScale(item))
//                 .startAngle((index * 15) * (Math.PI / 180))
//                 .endAngle((index * 15 + 15) * (Math.PI / 180))
//                 .padAngle(0.02)
//         );
//     });
//     frequencyBarG.selectAll('path')
//         .data(arcPathArr)
//         .join('path')
//         .attr('d', (d)=>{
//             return d();
//         })
//         .attr('fill', '#39a6dd');

//     // 添加组元素g，包裹刻度
//     let axisG = canvas.append('g')
//     .attr('transform', `translate(${canvas.attr('width') / 2}, ${canvas.attr('height') / 2})`);
//     // 绘制刻度
//     let axisMark = null;
//     AXISMARKARR.forEach((item)=>{
//         axisMark = axisG.append('g')
//             .attr('transform', `rotate(${-90 + item * 15}) translate(${INNERRADIUS}, 0)`); 
//         axisMark.append('line')
//             .attr('x2', -5)
//             .attr('stroke', '#000')
//             .attr('stroke-width', '1.5px');
//         axisMark.append('text')
//             .attr("text-anchor", "middle")
//             .attr('transform', 'rotate(90) translate(0, 12)')
//             .attr('font-size', '0.6rem')
//             .text(`${item}h`);
//     })

//     canvasStore.current = canvas;
// }

// // 绘制内圈的各时段排放径向面积图
// export const drawRadialAreaOfEmission = (canvasObj)=>{
//     const OUTTERRADIUS = 88;
//     const INNERRADIUS = 50;
//     // 发送请求，获取数据
//     const data = {"emission": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6123.847797152448, 2402.3407410162918, 1972.0003299551886, 1654.083280100097, 1840.1531191370243, 1847.7861073634663, 1829.4409380120806, 1937.926705713207, 2053.0250547396026, 2041.4868337673022, 2470.8412296078213, 2084.7057413344305, 2776.638203683473, 2177.1322510337786, 2600.6726932122046, 2140.8743311205794, 2633.7728478777335, 2587.5200872560354, 2708.435442206499, 2481.3875263393484, 2336.467231154931, 2428.482957089986, 2460.903125699904, 2279.823003987356, 2164.828558691266, 1875.899297844188, 2151.152912632676, 2231.5769921573624, 2332.7599811399186, 2170.219891436707, 2233.0036528260516, 1862.241368139782, 2002.0435027932717, 2130.8551293801897, 2290.8457778699467, 1887.0457216626914, 2231.0904073501824, 2199.895078701569, 2007.1669638626013, 2000.5646498178228, 1927.1999614770057, 1969.5520496405375, 1805.4188527023396, 2048.6391455130697, 2192.6796913996604, 2304.305366069561, 2566.2487852640893, 2309.1169895897265, 2523.2574378509366, 2380.3062974469112, 2060.260230517458, 2000.2392690470385, 2107.4597833073044, 2036.8872273623256, 2109.703131779557, 1951.2065628613686, 2173.102120095156, 1913.776446721285, 1946.536936011868, 1704.5070096239228, 2075.8033574652395, 2072.4904870776577, 1599.4325217565115, 1474.0428554489542, 1273.4866126535294, 1209.6348971132268, 1094.0147060729323, 634.3050063440571], "max": 6123.847797152448, "average": 1511.5057416987527};
//     // 定义线性比例尺
//     let linearScale = d3.scaleLinear()
//         .domain([0, data.max])
//         .range([INNERRADIUS, OUTTERRADIUS])
//     // 绘制最大值径向面积
//     let arcPath = d3.arc()
//         .innerRadius(INNERRADIUS)
//         .outerRadius(OUTTERRADIUS);
//     canvasObj.append('g')
//         .append('path')
//         .attr('d', arcPath({startAngle: 0, endAngle: 2 * Math.PI}))
//         .attr("transform", `translate(${canvasObj.attr('width') / 2}, ${canvasObj.attr('height') / 2})`)
//         .attr('fill', '#39a6dd')
//         .attr('fill-opacity', 0.3);
//     // 绘制平均排放线
//     canvasObj.append('g')
//         .append('circle')
//         .attr("cx", canvasObj.attr('width') / 2)
//         .attr("cy", canvasObj.attr('height') / 2)
//         .attr("r", linearScale(data.average))
//         .attr('stroke', '#39a6dd')
//         .attr('stroke-width', '2px')
//         .attr("stroke-dasharray", 8 + " " + 4)
//         .attr("fill", "none"); 
//     // 平分角度
//     let angles = d3.range(0, 2 * Math.PI, Math.PI / 48);
//     // 创建径向面积生成器
//     let area = d3.areaRadial()
//         .curve(d3.curveLinearClosed)
//         .angle((d) => { return d })
//         .innerRadius(INNERRADIUS)
//         .outerRadius((d, i) => { return linearScale(data.emission[i]) });
//     // 开始绘制
//     canvasObj.append('g')
//         .attr("transform", `translate(${canvasObj.attr('width') / 2}, ${canvasObj.attr('height') / 2})`)
//         .append('path')
//         .attr('d', area(angles))
//         .attr("fill", "#39a6dd")
//         .attr("fill-opacity", 0.7);
//     // 绘制旅行目的文字
//     canvasObj.append('g')
//         .append('text')
//         .attr("text-anchor", "middle")
//         .attr("transform", `translate(${canvasObj.attr('width') / 2}, ${canvasObj.attr('height') / 2})`)
//         .attr('font-size', '0.9rem')
//         .attr('font-weight', 600)
//         .attr('color', '#aaa')
//         .text('Traffic');
// }