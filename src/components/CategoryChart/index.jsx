import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { category, monthArray, monthCategoryData } from '../../data/categoryChart';
import { formatLargeNumber } from '../../utils';
import './style.less';

const textColor = "9AA8D4";

const itemStyle ={
  normal:{
    label:{
      formatter:function(a){
        return formatLargeNumber(a.value);}
    }
  },
};

const markPoint= {
  data: [
    { type: 'max', name: '最大值' },
  ],
  itemStyle:itemStyle
};

let timer;

export default function CategoryChart(){
  const categoryRef = useRef();
  useEffect(() => {
    const categoryChart = echarts.init(categoryRef.current);
    const option = {
      title:{  
        text: '销售额（按 自行车）(万)', 
        textStyle: {
          color: '#9AA8D4'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:function(a,b,c){
          return `${a[0].axisValue}<br/>${a[0].seriesName}  ${formatLargeNumber(a[0].value)}万元`;
        }
      },
      legend: {
        left:'right',
        data: (function getXYData() {
          const data = category; 
          const property = "category";
          const res = [];
          data.forEach(function (item) {
            res.push(item[property])
          })
          return res
        })(),
        textStyle: {
          color: textColor
        },
        selectedMode: 'single'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          },
        }
      },
      xAxis: {
        type: 'category',
        data: monthArray,
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      series: [
        {
          name: '自行车',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: monthCategoryData["自行车"],
          itemStyle,
          markPoint,    
        },
        {
          name: '服装',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: monthCategoryData["服装"],
          itemStyle,
          markPoint,      
        },
        {
          name: '配件',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: monthCategoryData["配件"],
          itemStyle,
          markPoint
        },
        {
          name: '辅助用品',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: monthCategoryData["辅助用品"],
          itemStyle,
          markPoint
        }
      ]
    };
    categoryChart.setOption(option);
    let i = 0;
    const data = categoryChart.getOption().legend[0].data;
    timer = setInterval(() => {
      categoryChart.dispatchAction({ type: 'legendUnSelect', name: data[ i % data.length ] })
      // legendToggleSelect（切换图例的选中状态）
      categoryChart.dispatchAction({ type: 'legendToggleSelect', name: data[ ++i % data.length ] })
      option.title.text=`销售额（按 ${data[ i % data.length ]}）`; //动态设置标题
      categoryChart.setOption(option);
    }, 3500)
    return () => clearTimeout(timer);
  }, []);
  return(
    <div ref={categoryRef} style={{ height: '400px' }} className="chart">我是分类图表</div>
  )
}