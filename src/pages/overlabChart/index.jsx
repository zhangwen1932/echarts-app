import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { timeData, timeData2 } from './data';

// 重叠折线图
export default function BarChart() {
  const chartRef = useRef();
  useEffect(() => {
    const testChart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: '测试图表',
        left: 'center',
      },
      xAxis: [{
        // type: 'time',
        type: 'category',
        data: timeData.map((item) => item.time),
      }],
      yAxis: [{
        type: 'value',
      }],
      tooltip: {
        trigger: 'axis',
      },
      visualMap: {
        show: false,
        type: 'continuous',
        dimension: 0,
      },
      series: [
        {
          type: 'line',
          data: timeData,
          symbol: 'none',
          lineStyle: {
            color: 'red',
          },
        },
        {
          type: 'line',
          data: timeData2,
          symbol: 'none',
          lineStyle: {
            color: 'transparent',
          },
          areaStyle: {
            color: 'green',
          },
        },
      ],
    };
    testChart.setOption(option);
  }, []);
  return (
    <div ref={chartRef} style={{ height: '600px', width: '600px' }} />
  );
}
