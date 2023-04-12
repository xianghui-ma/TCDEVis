import * as echarts from 'echarts';
import axios from 'axios';

const travelType = ['Traffic', 'Shop', 'Dining', 'Service', 'Pastime', 'Medical', 'Hotel', 'Home', 'Work', 'School', 'Other'];

export const initChart = async (store)=>{
    let data = await axios.get('http://127.0.0.1:8080/boxbar.json');
    data = data.data;
    store.current = {};
    const idArr = ['speed', 'distance', 'time', 'co2'];
    const titleArr = ['Speed(m/s)', 'Distance(km)', 'Time(h)', 'CO2(kg)'];
    let chart = null;
    idArr.forEach((item, index)=>{
        chart = echarts.init(document.getElementById(item));
        store.current[item] = {
            chart,
            toggleStatus: true
        };
        drawBar(data[item], chart, item == 'speed', titleArr[index]);
    });
}

export const modelToggle = (id, title, store)=>{
    return async ()=>{
        let url = store.current[id].toggleStatus ? 'http://127.0.0.1:8080/boxplot.json' : 'http://127.0.0.1:8080/boxbar.json';
        let data = await axios.get(url);
        data = data.data;
        store.current[id].toggleStatus ? drawBoxPlot(data[id], store.current[id].chart, id == 'speed', title) : drawBar(data[id], store.current[id].chart, id == 'speed', title);
        store.current[id].toggleStatus = !store.current[id].toggleStatus;
    }
}

const drawBar = (data, chart, ifSpeed, title)=>{
    chart.setOption({
        grid: ifSpeed ? {
            left: '18%',
            right: '1%',
            bottom: '1%',
            top: '5%'
        } : {
            left: '0%',
            right: '1%',
            bottom: '1%',
            top: '5%'
        },
        title: {
            text: title,
            left: 'center',
            textStyle: {
                fontSize: 12
            }
        },
        xAxis: {
            type: 'value',
            z: 10,
            axisLine: {
                show: true
            },
            axisTick: {
                show: true,
                inside: true
            },
            axisLabel: {
                inside: true,
                rotate: 45,
                color: '#000'
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#fff', '#ddd']
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: ifSpeed,
                color: '#000'
            },
            data: ['Traffic', 'Shop', 'Dining', 'Service', 'Pastime', 'Medical', 'Hotel', 'Home', 'Work', 'School', 'Other']
        },
        series: [{
            data,
            type: 'bar',
            itemStyle: {
                color: '#39a6dd'
            }
        }]
    });
}

const drawBoxPlot = (data, chart, ifSpeed, title)=>{
    chart.setOption({
        title: [
            {
                text: title,
                left: 'center',
                textStyle: {
                    fontSize: 12
                }
            }
        ],
        dataset: [
            {
                source: data
            },
            {
            transform: {
                type: 'boxplot',
                config: {
                    itemNameFormatter: function (params) {
                        return travelType[params.value];
                    }
                }
            }
            },
            {
                fromDatasetIndex: 1,
                fromTransformResult: 1
            }
        ],
        grid: ifSpeed ? {
            left: '18%',
            right: '1%',
            bottom: '1%',
            top: '5%'
        }:{
            left: '0%',
            right: '1%',
            bottom: '1%',
            top: '5%'
        },
        yAxis: {
            type: 'category',
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#fff', '#ddd']
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: ifSpeed,
                color: '#000'
            }
        },
        xAxis: {
            type: 'value',
            z: 10,
            axisLine: {
                show: true
            },
            axisTick: {
                show: true,
                inside: true
            },
            axisLabel: {
                inside: true,
                rotate: 45,
                color: '#000'
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                itemStyle: {
                    color: '#aaa',
                    borderColor: '#000'
                },
                datasetIndex: 1
            }
        ]
    });
}