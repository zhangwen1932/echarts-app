import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { monthSale } from '../../data/barChart';
import { monthArray } from '../../data/categoryChart';

export default function BarChart(){
  const barRef = useRef();
  useEffect(() => {
    const barChart = echarts.init(barRef.current);
    const option = {
      color: ['#3398DB'],
      title: {
        text: '月销售额（万）', 
        left: 'center',
        textStyle: {
          color: '#9AA8D4'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['月份']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          gdata: monthArray,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        }
      ],
      series: [
        {
          name: '月销售总额',
          type: 'bar',
          data: (function getXYData() {
            const data = monthSale;
            const property = "value";
            const res = [];
            data.forEach(function (item) {
              res.push(item[property])
            })
            return res
          })(),
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
      ]
    };
    barChart.setOption(option);
  }, [])
  return (
    <div ref={barRef} class="chart">BarChart</div>
  )
}