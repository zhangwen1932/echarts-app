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
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      // 提示框组件
      tooltip: {    
        formatter:function(a,b,c){
           return `${a.name}<br/>${formatLargeNumber(a.value)}万元`;
        },
        //  显示弹窗的样式
        // textStyle: {
        //   color: 'red',
        // },
      },
      series: [{
        type: 'pie',
        radius: 50,
        center: ['25%', '20%'],
        data: categoryClassifyData[0].data,
        colorBy: 'data',
        label: {
          color: 'inherit',
          textBorderWidth: 0,
        },
        // No encode specified, by default, it is '2012'.
       }, {
        type: 'pie',
        radius: 50,
        center: ['65%', '20%'],
        data: categoryClassifyData[1].data,
        label: {
          color: 'inherit', // 这个值可以设置固定色值也可以使用inherit会继承相应饼图颜色
          textBorderWidth: 0,  // 设置这个值必须先设置color值，不然没有效果
        },
      }, {
        type: 'pie',
        radius: 50,
        center: ['25%', '65%'],
        data: categoryClassifyData[2].data,
        label: {
          color: 'inherit',
          textBorderWidth: 0,
        },
      }, {
        type: 'pie',
        radius: 50,
        center: ['65%', '65%'],
        data: categoryClassifyData[3].data,
        label: {
          color: 'inherit',
          textBorderWidth: 0,
        },
      }],
    };
    multiChart.setOption(option);
  }, [])
  return (
    <div ref={multiChartRef} style={{ 'height': '500px' }} className="chart" />
  )
}