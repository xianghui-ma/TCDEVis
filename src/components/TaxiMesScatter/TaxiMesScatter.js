import axios from 'axios';
import * as Plot from "@observablehq/plot";

export const drawTaxiMesScatterView = async (url, flagStore, travelType, boxIdArr)=>{
    flagStore.current = true;
    let data = await axios.get(url);
    data = data.data[travelType];
    let canvas = null;
    const xLabel = ['Speed', 'Distance', 'Time'];
    boxIdArr.forEach((boxId, index)=>{
        canvas = document.getElementById(boxId);
        canvas.append(Plot.plot({
            inset: 15,
            width: canvas.offsetWidth,
            height: canvas.offsetHeight,
            marginLeft: 27,
            marginBottom: 20,
            color: {scheme: 'PuRd'},
            y: {label: 'CO2'},
            x: {label: xLabel[index]},
            marks: [
                Plot.hexagon(
                    data[index],
                    Plot.hexbin(
                        {fill: "count"},
                        {x: d=>d[0], y: d=>d[1]}
                    )
                )
            ]
        }));
    });
}