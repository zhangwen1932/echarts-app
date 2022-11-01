import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function BarChart(){
  const chartRef = useRef();
  useEffect(() => {
    const testChart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: '测试图表',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
      },
      // 边上的组件色块位置 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
      legend: {
        // top: '5%',
        orient: 'vertical',
        left: 'left',
        // bottom: '5%',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          // avoidLabelOverlap: false,
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          // label: {
          //   show: true,
          //   position: 'outside'
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            length2: 0,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    testChart.setOption(option);
  }, []);
  return (
    <div ref={chartRef} style={{ height: '600px', width: '600px' }}/>
  )
}