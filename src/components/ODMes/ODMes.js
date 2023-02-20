import * as d3 from 'd3';

// **********绘制图标中的变量**********
// 绘制编码出行目的的小圆
const drawVaryCircle = (g, width)=>{
  // mock各出行目的数量
  let travel = [11,8,45,21,2,34,79,50,25,0];
  // 定义小圆的尺寸比例尺
  let sizeScale = d3.scaleLinear().domain([0, d3.max(travel)]).range([1, 9]);
  // 绘制小圆
  let travelG = g.append('g');
  travel.forEach((item, index)=>{
    travelG.append('g')
      .attr('transform', `rotate(${-130 + index * 18}) translate(0, ${width / 2 - 40})`)
      .append('circle')
      .attr('r', ()=>{
        return sizeScale(item);
      })
      .attr('fill', '#39a6dd');
  });
}

// 绘制速度指针三角形
const drawTriangle = (g, width)=>{
  let triangleG = g.append('g');
  triangleG.append('polygon')
    .attr('points', `-10,20 10,20 0,${width / 2 - 80}`)
    .attr('transform', `rotate(${-120})`)
    .attr('fill', '#39a6dd');
}

// 绘制固定图标
const drawIcon = (g, width, clusterIndex)=>{
  let colorScale = d3.scaleLinear()
    .domain([0, 120])
    .range(['#D3D4D5', '#39a6dd']);

  // 绘制中心实心小圆
  g.append('g')
    .append('circle')
    .attr("r", 30)
    .attr("fill", "#39a6dd");
  // 绘制族说明文字
  g.append('g')
    .append('text')
    .attr('transform', `translate(0, 7)`)
    .attr("text-anchor", "middle")
    .attr('font-size', '1.5rem')
    .attr('font-weight', 600)
    .attr('fill', '#fff')
    .text('C' + clusterIndex);
  // 绘制外层距离圆弧
  let arcDistance = d3.arc()
    .innerRadius(width / 2 - 50)
    .outerRadius(width / 2 - 30)
    .startAngle(-45 * (Math.PI / 180))
    .endAngle(45 * (Math.PI / 180));
  g.append('path')
    .attr('d', arcDistance)
    .attr('stroke', '#C1C2C4')
    .attr('stroke-width', '2px')
    .attr('fill', '#E8E8E7');
  // 绘制外层行驶时长圆弧
  let arcTimeSpan = d3.arc()
    .innerRadius(width / 2 - 50)
    .outerRadius(width / 2 - 30)
    .startAngle(-45 * (Math.PI / 180))
    .endAngle(-135 * (Math.PI / 180));
  g.append('path')
    .attr('d', arcTimeSpan)
    .attr('stroke', '#C1C2C4')
    .attr('stroke-width', '2px')
    .attr('fill', '#E8E8E7');
  // 绘制内层碳排放圆弧
  let arcCO2 = d3.arc()
    .innerRadius(width / 2 - 50 - 20)
    .outerRadius(width / 2 - 50)
    .startAngle(135 * (Math.PI / 180))
    .endAngle(225 * (Math.PI / 180));
  g.append('path')
    .attr('d', arcCO2)
    .attr('stroke', '#39a6dd')
    .attr('stroke-width', '2px')
    .attr('fill', 'none');
  // 绘制内层速度热力12个方块
  let arcPathArr = [];
  for (let i = 1; i <= 12; i++){
    arcPathArr.push(
      d3.arc()
        .innerRadius(width / 2 - 50 - 22)
        .outerRadius(width / 2 - 50 - 4)
        .startAngle((20 * i - 140) * (Math.PI / 180))
        .endAngle(((20 * i - 140) + 18) * (Math.PI / 180))
    );
  }
  g.append('g').selectAll('path')
        .data(arcPathArr)
        .join('path')
        .attr('d', (d)=>{
            return d();
        })
        .attr('fill', (_, i)=>{
          return(colorScale((i + 1) * 10))
        });
  // 绘制速度说明文字
  g.append('g')
    .append('text')
    .attr('transform', `rotate(${60}) translate(0, ${width / 2 - 50 - 25})`)
    .attr("text-anchor", "middle")
    .attr('font-size', '1rem')
    .attr('font-weight', 600)
    .attr('fill', '#bbb')
    .text(0);
  g.append('g')
    .append('text')
    .attr('transform', `rotate(${-60}) translate(0, ${width / 2 - 50 - 25})`)
    .attr("text-anchor", "middle")
    .attr('font-size', '1rem')
    .attr('font-weight', 600)
    .attr('fill', '#bbb')
    .text(120);
  // 绘制最外层大圆
  g.append('g')
    .append('circle')
    .attr("r", width / 2 - 50)
    .attr('stroke', '#39a6dd')
    .attr('stroke-width', '2px')
    .attr("fill", "none");

  // 绘制图标中的变量
  drawVaryCircle(g, width);
  drawTriangle(g, width);
}

export const drawClusterGraph = (containerId, store)=>{
  // 选择DOM容器
  let canvas = document.getElementById(containerId);
  // 向容器中添加svg画布
  canvas = d3.select(`#${containerId}`)
      .append('svg')
      .attr('width', canvas.offsetWidth)
      .attr('height', canvas.offsetHeight);
  // 计算每个单元格的宽高
  let width = canvas.attr('width') / 3;
  let height = canvas.attr('height') / 1;
  // 单元格数组
  let cellArr = [];
  // 排列第一排的单元格
  for(let i = 0; i < 3; i++){
      cellArr.push(
          canvas.append('g')
              .attr('transform', `translate(${(width / 2) + (i * width)}, ${height / 2})`)
      );
  }

  // **********绘制图标**********
  cellArr.forEach((item, index)=>{
    drawIcon(item, width, index);
  });

  store.current = canvas;
}