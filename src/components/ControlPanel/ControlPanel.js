import pubsub from 'pubsub-js';

// 存放地图图层信息
const layersMes = {
    map: null,
    odHeatmapLayer: null
}

// 获取地图实例和图层信息
export const getMapAndLayers = (_, mes)=>{
    Object.assign(layersMes, mes);
}

// 显示/隐藏OD图层
export const isShowOdLayer = (checked)=>{
    checked ? layersMes.map.addLayer(layersMes.odHeatmapLayer) : layersMes.map.removeLayer(layersMes.odHeatmapLayer);
}

// 初始化控制面板
export const initTravelInControlPanel = ()=>{
    const leftCol = ['Traffic', 'Dining', 'Pastime', 'Hotel', 'Work', 'Other'];
    const rightCol = ['Shop', 'Service', 'Medical', 'Home', 'School'];
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
    return <section className='travelList'>
        <section className="leftCol">{
            leftCol.map((item)=>{
                return <p><span className='colorMark' style={{backgroundColor: colors[item]}}></span><span>{item}</span></p>
            })
        }</section>
        <section className="rightCol">{
            rightCol.map((item)=>{
                return <p><span className='colorMark' style={{backgroundColor: colors[item]}}></span><span>{item}</span></p>
            })
        }</section>
    </section>
}

export const handleOdControlInput = (store)=>{
    return (accuracyValue)=>{
        store.current = accuracyValue;
    }
}

export const initSelectTravelType = ()=>{
    const travelType = ['Traffic', 'Dining', 'Pastime', 'Hotel', 'Work', 'Other', 'Shop', 'Service', 'Medical', 'Home', 'School'];
    return travelType.map((item)=>{
        return {
            value: item,
            label: item
        }
    });
}

// 获取所选的travel类型
export const getTravelType = (data)=>{
    pubsub.publish('travelType', data);
}