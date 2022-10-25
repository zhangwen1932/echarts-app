import { useRef, useEffect } from 'react';
import { categoryClassifyData } from '../../data/mutilPieChart';
import { formatLargeNumber } from '../../utils'; 
import * as echarts from 'echarts';

export default function MutiPieChart(){
  let multiChartRef = useRef();
  useEffect(() => {
    const multiChart = echarts.init(multiChartRef.current);
    const option = {
      legend: {
        show:false
      },
      tooltip: {    
        formatter:function(a,b,c){
           return `${a.name}<br/>${formatLargeNumber(a.value)}万元`;
        }
      },
      series: [{
        type: 'pie',
        radius: 50,
        center: ['25%', '20%'],
        data: categoryClassifyData[0].data
        // No encode specified, by default, it is '2012'.
       }, {
        type: 'pie',
        radius: 50,
        center: ['65%', '20%'],
        data: categoryClassifyData[1].data
      }, {
        type: 'pie',
        radius: 50,
        center: ['25%', '65%'],
        data: categoryClassifyData[2].data
      }, {
        type: 'pie',
        radius: 50,
        center: ['65%', '65%'],
        data: categoryClassifyData[3].data
      }]
    };
    multiChart.setOption(option);
  }, [])
  return (
    <div ref={multiChartRef} style={{ 'height': '500px' }} className="chart" />
  )
}