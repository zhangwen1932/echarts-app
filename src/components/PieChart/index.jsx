import { useRef, useEffect } from 'react';
import { categorySale } from '../../data/pieChart';
import * as echarts from 'echarts';

export default function PieChart(){
  let pieChartRef = useRef();
  useEffect(() => {
    const pieChart = echarts.init(pieChartRef.current);
    const option = {
      title: {
        text: '销售额（万）（按一级分类）',
        left: 'center',
        textStyle: {
          color: '#9AA8D4'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.data.category} 
            <br/>${params.data.value}元(${params.percent}%)`;
        }
      },
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: categorySale,
          label: {
            show: true,
            formatter: function(res){
              return res.data.category;
            },
            color: 'inherit',
            textBorderWidth: 0,
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      ]
    };
    pieChart.setOption(option);
  }, []);
  return(
    <div ref={pieChartRef} className="chart" />
  )
}