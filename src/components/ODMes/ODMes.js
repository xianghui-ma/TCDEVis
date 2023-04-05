import * as d3 from 'd3';
import { Table } from 'antd';
import * as echarts from 'echarts';
import L from 'leaflet';

let pathLayers = null;
let pathFromScatter = null;

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

const mapScatterToPath = (selectedPoints, scatterPath, map)=>{
  // console.log(selectedPoints, scatterPath, map);
  let travelName = '';
  let pointArr = null;
  let targetArr = null;
  let paths = [];
  selectedPoints.forEach((points)=>{
    if(points.dataIndex.length !== 0){
      travelName = points.seriesName;
      pointArr = points.dataIndex;
      targetArr = scatterPath[travelName];
      pointArr.forEach((item)=>{
        paths.push(JSON.parse(targetArr[item]));
      });
    }
  });
  pathFromScatter = L.geoJSON(paths, {
    style: {
      "color": "#8C2752",
      "weight": 2,
      "opacity": 0.4
    }
  }).addTo(map);
}

// 绘制散点图
export const drawScatter = (containerId, odData, scatterPath, mapStore)=>{
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
  let selectedPoints = null;

  chart.on('brushSelected', (params)=>{
    selectedPoints = params.batch[0].selected;
  });

  chart.on('brushEnd', (params)=>{
    if(params.areas.length === 0){
      pathFromScatter && mapStore.current.removeLayer(pathFromScatter);
    }else{
      mapScatterToPath(selectedPoints, scatterPath, mapStore.current);
    }
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
  }, true);
}


// **********绘制表格**********
export const drawTable = (data, mapStore)=>{
  // mock数据
  // let data = [
  //   {
  //     key: '1',
  //     speed: 27.265625,
  //     time: 18.0,
  //     distance: 9870,
  //     co2: 3.90752727880241,
  //     purpose: 3,
  //     trajectory: '#1'
  //   }
  // ];
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
    onChange: (_, selectedRows) => {
      let path = []
      pathLayers && mapStore.current.removeLayer(pathLayers);
      selectedRows.forEach((item)=>{
        path.push(JSON.parse(item['traj']));
      });
      pathLayers = L.geoJSON(path, {
          style: {
            "color": "#8C2752",
            "weight": 2,
            "opacity": 0.4
          }
      }).addTo(mapStore.current);
    }
  }}/>;
}

// 绘制条形统计图
export const drawBarStatics = (containerId, barData)=>{
  let chart = echarts.init(document.getElementById(containerId));
  let data = []
  for(let key in barData){
    data.push({
      value: barData[key],
      itemStyle: {
        color: colors[key]
      }
    });
  }
  chart.setOption({
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    title: {
      text: 'Number of travel',
      textStyle: {
        fontWeight: 600,
        fontSize: 12,
        color: '#000',
      }
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data,
        type: 'bar'
      }
    ]
  });
}

// 绘制时间频率热力图
export const drawTimeFrequency = (containerId, data)=>{
  // 定义刻度文本
  const text = ['01', '03', '05', '07', '08', '11', '13', '15', '17', '19', '21', '23'];
  // 定义容器宽高
  const width = 480;
  const height = 66;
  // 定义正方形尺寸
  const size = 18;
  // 定义颜色比例尺
  let colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['#fff', '#39a6dd']);
  // 向容器中添加svg画布
  let canvas = d3.select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  // 开始绘制24个正方形
  const squares = canvas.append('g')
    .attr("transform", `translate(20, 20)`)
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect');
  squares
    .attr('x', (d, i) => i * size)
    .attr('y', 0)
    .attr('width', size)
    .attr('height', size)
    .attr('stroke', '#fff')
    .attr('stroke-width', '1px')
    .attr('fill', (d)=>{
      return colorScale(d);
    });
  // 添加刻度
  const textScale = d3.scaleBand()
    .domain(text)
    .range([0, 431]);
  const axisGenerator = d3.axisBottom(textScale)
    .ticks(12);
  canvas.append("g")
    .attr("transform", "translate(20, 40)")
    .call(axisGenerator);
  // 添加title
  canvas.append("text")
    .attr("x", 5)
    .attr("y", height - 50)
    .text("Time Heatmap")
    .attr("font-size", "12px")
    .attr("fill", "#000")
    .attr('font-weight', 600);
}