import * as d3 from 'd3';
import { Table } from 'antd';
import * as echarts from 'echarts';

// // **********绘制图标中的变量**********
// // 绘制编码出行目的的小圆
// const drawVaryCircle = (g, width)=>{
//   // mock各出行目的数量
//   let travel = [11,8,45,21,2,34,79,50,25,0];
//   // 定义小圆的尺寸比例尺
//   let sizeScale = d3.scaleLinear().domain([0, d3.max(travel)]).range([1, 9]);
//   // 绘制小圆
//   let travelG = g.append('g');
//   travel.forEach((item, index)=>{
//     travelG.append('g')
//       .attr('transform', `rotate(${-130 + index * 18}) translate(0, ${width / 2 - 40})`)
//       .append('circle')
//       .attr('r', ()=>{
//         return sizeScale(item);
//       })
//       .attr('fill', '#39a6dd');
//   });
// }

// // 绘制速度指针三角形
// const drawTriangle = (g, clusterIndex, width)=>{
//   // mock数据
//   let cluster_data = {0: {'speed_mean': 26.506147994187383, 'time_mean': 21.094827586206897, 'distance_mean': 10165.103448275862, 'co2_mean': 4.339365962266263}, 1: {'speed_mean': 24.204628064226846, 'time_mean': 31.73913043478261, 'distance_mean': 14436.449275362318, 'co2_mean': 6.143573295744254}, 2: {'speed_mean': 26.265488137494962, 'time_mean': 28.68421052631579, 'distance_mean': 21581.0, 'co2_mean': 8.805922803174237}};
//   let max_data = {'average_speed_max': 56.0204081632653, 'time_span_max': 58.0, 'distance_max': 34136, 'co2_max': 17.2100851677064};
//   // 定义指针比例尺
//   let speedScale = d3.scaleLinear().domain([0, max_data.average_speed_max]).range([60, 300]);
//   // 开始绘制指针
//   let triangleG = g.append('g');
//   triangleG.append('polygon')
//     .attr('points', `-10,20 10,20 0,${width / 2 - 80}`)
//     .attr('transform', `rotate(${speedScale(cluster_data[clusterIndex].speed_mean)})`)
//     .attr('fill', '#39a6dd');
// }

// // 绘制距离和时间跨度占比圆弧
// const distanceAndTimespan = (g, clusterIndex, width)=>{
//   // mock数据
//   let cluster_data = {0: {'speed_mean': 26.506147994187383, 'time_mean': 21.094827586206897, 'distance_mean': 10165.103448275862, 'co2_mean': 4.339365962266263}, 1: {'speed_mean': 24.204628064226846, 'time_mean': 31.73913043478261, 'distance_mean': 14436.449275362318, 'co2_mean': 6.143573295744254}, 2: {'speed_mean': 26.265488137494962, 'time_mean': 28.68421052631579, 'distance_mean': 21581.0, 'co2_mean': 8.805922803174237}};
//   let max_data = {'average_speed_max': 56.0204081632653, 'time_span_max': 58.0, 'distance_max': 34136, 'co2_max': 17.2100851677064};
//   // 定义距离比例尺
//   let distanceScale = d3.scaleLinear().domain([0, max_data.distance_max]).range([-45, 45]);
//   // 定义时间跨度比例尺
//   let timespanScale = d3.scaleLinear().domain([0, max_data.time_span_max]).range([-45, -135]);
//   // 开始绘制距离占比圆弧
//   let arcDistance = d3.arc()
//     .innerRadius(width / 2 - 50)
//     .outerRadius(width / 2 - 30)
//     .startAngle(-45 * (Math.PI / 180))
//     .endAngle(distanceScale(cluster_data[clusterIndex].distance_mean) * (Math.PI / 180));
//   g.append('path')
//     .attr('d', arcDistance)
//     .attr('stroke', '#C1C2C4')
//     .attr('stroke-width', '2px')
//     .attr('fill', '#39a6dd');
//   // 开始绘制时间跨度圆弧
//   let arcTimeSpan = d3.arc()
//     .innerRadius(width / 2 - 50)
//     .outerRadius(width / 2 - 30)
//     .startAngle(-45 * (Math.PI / 180))
//     .endAngle(timespanScale(cluster_data[clusterIndex].time_mean) * (Math.PI / 180));
//   g.append('path')
//     .attr('d', arcTimeSpan)
//     .attr('stroke', '#C1C2C4')
//     .attr('stroke-width', '2px')
//     .attr('fill', '#39a6dd');
// }

// // 绘制碳排放占比圆弧
// const co2Arc = (g, width, clusterIndex)=>{
//   // mock数据
//   let cluster_data = {0: {'speed_mean': 26.506147994187383, 'time_mean': 21.094827586206897, 'distance_mean': 10165.103448275862, 'co2_mean': 4.339365962266263}, 1: {'speed_mean': 24.204628064226846, 'time_mean': 31.73913043478261, 'distance_mean': 14436.449275362318, 'co2_mean': 6.143573295744254}, 2: {'speed_mean': 26.265488137494962, 'time_mean': 28.68421052631579, 'distance_mean': 21581.0, 'co2_mean': 8.805922803174237}};
//   let max_data = {'average_speed_max': 56.0204081632653, 'time_span_max': 58.0, 'distance_max': 34136, 'co2_max': 17.2100851677064};
//   // 定义碳排放比例尺
//   let co2Scale = d3.scaleLinear().domain([0, max_data.co2_max]).range([225, 135]);
//   // 开始绘制圆弧
//   let arcCO2 = d3.arc()
//     .innerRadius(width / 2 - 50 - 20)
//     .outerRadius(width / 2 - 50)
//     .startAngle(225 * (Math.PI / 180))
//     .endAngle(co2Scale(cluster_data[clusterIndex].co2_mean) * (Math.PI / 180));
//   g.append('path')
//     .attr('d', arcCO2)
//     .attr('stroke', '#39a6dd')
//     .attr('stroke-width', '2px')
//     .attr('fill', '#39a6dd');
// }

// // **********绘制固定图标**********
// const drawIcon = (g, width, clusterIndex)=>{
//   // mock数据
//   let cluster_data = {0: {'speed_mean': 26.506147994187383, 'time_mean': 21.094827586206897, 'distance_mean': 10165.103448275862, 'co2_mean': 4.339365962266263}, 1: {'speed_mean': 24.204628064226846, 'time_mean': 31.73913043478261, 'distance_mean': 14436.449275362318, 'co2_mean': 6.143573295744254}, 2: {'speed_mean': 26.265488137494962, 'time_mean': 28.68421052631579, 'distance_mean': 21581.0, 'co2_mean': 8.805922803174237}};
//   let max_data = {'average_speed_max': 56.0204081632653, 'time_span_max': 58.0, 'distance_max': 34136, 'co2_max': 17.2100851677064};

//   let colorScale = d3.scaleLinear()
//     .domain([0, max_data.average_speed_max])
//     .range(['#D3D4D5', '#39a6dd']);

//   // 绘制中心实心小圆
//   g.append('g')
//     .append('circle')
//     .attr("r", 30)
//     .attr("fill", "#39a6dd");
//   // 绘制族说明文字
//   g.append('g')
//     .append('text')
//     .attr('transform', `translate(0, 7)`)
//     .attr("text-anchor", "middle")
//     .attr('font-size', '1.5rem')
//     .attr('font-weight', 600)
//     .attr('fill', '#fff')
//     .text('C' + clusterIndex);
//   // 绘制外层距离圆弧
//   // let arcDistance = d3.arc()
//   //   .innerRadius(width / 2 - 50)
//   //   .outerRadius(width / 2 - 30)
//   //   .startAngle(-45 * (Math.PI / 180))
//   //   .endAngle(45 * (Math.PI / 180));
//   // g.append('path')
//   //   .attr('d', arcDistance)
//   //   .attr('stroke', '#C1C2C4')
//   //   .attr('stroke-width', '2px')
//   //   .attr('fill', '#E8E8E7');
//   // 绘制外层行驶时长圆弧
//   // let arcTimeSpan = d3.arc()
//   //   .innerRadius(width / 2 - 50)
//   //   .outerRadius(width / 2 - 30)
//   //   .startAngle(-45 * (Math.PI / 180))
//   //   .endAngle(-135 * (Math.PI / 180));
//   // g.append('path')
//   //   .attr('d', arcTimeSpan)
//   //   .attr('stroke', '#C1C2C4')
//   //   .attr('stroke-width', '2px')
//   //   .attr('fill', '#E8E8E7');
//   // 绘制内层碳排放圆弧
//   let arcCO2 = d3.arc()
//     .innerRadius(width / 2 - 50 - 20)
//     .outerRadius(width / 2 - 50)
//     .startAngle(135 * (Math.PI / 180))
//     .endAngle(225 * (Math.PI / 180));
//   g.append('path')
//     .attr('d', arcCO2)
//     .attr('stroke', '#39a6dd')
//     .attr('stroke-width', '2px')
//     .attr('fill', 'none');
//   // 绘制内层速度热力12个方块
//   let arcPathArr = [];
//   for (let i = 1; i <= 12; i++){
//     arcPathArr.push(
//       d3.arc()
//         .innerRadius(width / 2 - 50 - 22)
//         .outerRadius(width / 2 - 50 - 4)
//         .startAngle((20 * i - 140) * (Math.PI / 180))
//         .endAngle(((20 * i - 140) + 18) * (Math.PI / 180))
//     );
//   }
//   g.append('g').selectAll('path')
//     .data(arcPathArr)
//     .join('path')
//     .attr('d', (d)=>{
//         return d();
//     })
//     .attr('fill', (_, i)=>{
//       return(colorScale((max_data.average_speed_max / 12) * i))
//     });
//   // 绘制速度说明文字
//   g.append('g')
//     .append('text')
//     .attr('transform', `rotate(${60}) translate(0, ${width / 2 - 50 - 25})`)
//     .attr("text-anchor", "middle")
//     .attr('font-size', '1rem')
//     .attr('font-weight', 600)
//     .attr('fill', '#bbb')
//     .text(0);
//   g.append('g')
//     .append('text')
//     .attr('transform', `rotate(${-60}) translate(0, ${width / 2 - 50 - 25})`)
//     .attr("text-anchor", "middle")
//     .attr('font-size', '1rem')
//     .attr('font-weight', 600)
//     .attr('fill', '#bbb')
//     .text(120);
//   // 绘制最外层大圆
//   g.append('g')
//     .append('circle')
//     .attr("r", width / 2 - 50)
//     .attr('stroke', '#39a6dd')
//     .attr('stroke-width', '2px')
//     .attr("fill", "none");

//   // 绘制图标中的变量
//   drawVaryCircle(g, width);
//   drawTriangle(g, clusterIndex, width);
//   distanceAndTimespan(g, clusterIndex, width);
//   co2Arc(g, width, clusterIndex);
// }

// export const drawClusterGraph = (containerId, store)=>{
//   // 选择DOM容器
//   let canvas = document.getElementById(containerId);
//   // 向容器中添加svg画布
//   canvas = d3.select(`#${containerId}`)
//     .append('svg')
//     .attr('width', canvas.offsetWidth)
//     .attr('height', canvas.offsetHeight);
//   // 计算每个单元格的宽高
//   let width = canvas.attr('width') / 3;
//   let height = canvas.attr('height') / 1;
//   // 单元格数组
//   let cellArr = [];
//   // 排列第一排的单元格
//   for(let i = 0; i < 3; i++){
//       cellArr.push(
//           canvas.append('g')
//               .attr('transform', `translate(${(width / 2) + (i * width)}, ${height / 2})`)
//       );
//   }

//   // **********绘制图标**********
//   cellArr.forEach((item, index)=>{
//     drawIcon(item, width, index);
//   });

//   store.current = canvas;
// }

// 绘制散点图
export const drawScatter = (containerId, store, odData)=>{
  // 颜色配置
  const colors = {
      Traffic: '#a6cee3',
      Hotel: '#1f78b4',
      Pastime: '#b2df8a',
      School: '#33a02c',
      Shop: '#fb9a99',
      Service: '#e31a1c',
      Medical: '#fdbf6f',
      Dining: '#ff7f00',
      Home: '#cab2d6',
      Work: '#6a3d9a',
      Other: '#b15928',
  }
  // 创建series和legend
  let series = [];
  let legendData = [];
  for(let key in odData){
    legendData.push(key);
    series.push({
      name: key,
      symbolSize: 10,
      data: odData[key],
      type: 'scatter',
      itemStyle: {
        color: colors[key]
      }
    });
  }
  // 开始绘制
  let chart = echarts.init(document.getElementById(containerId));

  chart.on('brushSelected', (params)=>{
    console.log(params);
  });

  chart.setOption({
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0]
      },
      {
        type: 'inside',
        yAxisIndex: [0]
      }
    ],
    toolbox: {
      feature: {
        brush: {
          type: ['rect', 'polygon', 'clear']
        }
      }
    },
    legend: {
      data: legendData,
      orient: 'vertical',
      right: 2,
      top: 30
    },
    brush: {},
    series
  });
  store.current = chart;
}


// **********绘制表格**********
export const drawTable = ()=>{
  // mock数据
  let data = [
    {
      key: '1',
      speed: 27.265625,
      time: 18.0,
      distance: 9870,
      co2: 3.90752727880241,
      purpose: 3,
      trajectory: '#1'
    },
    {
      key: '2',
      speed: 36.3512820512821,
      time: 24.0,
      distance: 15714,
      co2: 3.87490603190572,
      purpose: 10,
      trajectory: '#2'
    },
    {
      key: '3',
      speed: 25.7302325581395,
      time: 24.0,
      distance: 11244,
      co2: 4.46311831500317,
      purpose: 7,
      trajectory: '#3'
    },
    {
      key: '4',
      speed: 28.4048780487805,
      time: 21.0,
      distance: 11395,
      co2: 4.47910644131827,
      purpose: 9,
      trajectory: '#4'
    },
    {
      key: '5',
      speed: 27.265625,
      time: 18.0,
      distance: 9870,
      co2: 3.90752727880241,
      purpose: 3,
      trajectory: '#5'
    },
    {
      key: '6',
      speed: 36.3512820512821,
      time: 24.0,
      distance: 15714,
      co2: 3.87490603190572,
      purpose: 10,
      trajectory: '#6'
    },
    {
      key: '7',
      speed: 25.7302325581395,
      time: 24.0,
      distance: 11244,
      co2: 4.46311831500317,
      purpose: 7,
      trajectory: '#7'
    },
    {
      key: '8',
      speed: 28.4048780487805,
      time: 21.0,
      distance: 11395,
      co2: 4.47910644131827,
      purpose: 9,
      trajectory: '#8'
    },
    {
      key: '9',
      speed: 25.7302325581395,
      time: 24.0,
      distance: 11244,
      co2: 4.46311831500317,
      purpose: 7,
      trajectory: '#9'
    },
    {
      key: '10',
      speed: 28.4048780487805,
      time: 21.0,
      distance: 11395,
      co2: 4.47910644131827,
      purpose: 9,
      trajectory: '#10'
    }
  ];
  let columns = [
    {
      title: 'Trajectory ID',
      dataIndex: 'trajectory',
    },
    {
      title: 'Trip Purposes',
      dataIndex: 'purpose',
    },
    {
      title: 'Average Speed',
      dataIndex: 'speed',
      sorter: {
        compare: (a, b) => a.speed - b.speed,
      }
    },
    {
      title: 'Trip Time',
      dataIndex: 'time',
      sorter: {
        compare: (a, b) => a.time - b.time,
      },
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      sorter: {
        compare: (a, b) => a.distance - b.distance,
      },
    },
    {
      title: 'CO2',
      dataIndex: 'co2',
      sorter: {
        compare: (a, b) => a.co2 - b.co2,
      },
    }
  ];
  let onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return <Table columns={columns} dataSource={data} onChange={onChange} pagination={{hideOnSinglePage: true}} rowSelection={{
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  }}/>;
}