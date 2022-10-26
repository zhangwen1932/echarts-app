import React, { useRef, useEffect } from 'react';
import chinaJson from '../../data/map/chinaChange.json';
import { provinceSale, geoCoordMap } from '../../data/mapComponents';
import { formatLargeNumber } from '../../utils';
import * as echarts from 'echarts';

export default function MapContainer(){
  const mapRef = useRef();
  const convertData2 = function (originData) {
    const res = [];
    const data=JSON.parse(JSON.stringify(originData))
    console.log('data', data);
    // data.forEach((item, index) => {
    //   const geoCoord = geoCoordMap[data[index].name];
    //   if (geoCoord) {
    //     res.push({
    //         name: data[index].name,
    //         value: geoCoord.concat(parseInt(formatLargeNumber(data[index].value)))
    //     });
    //   }
    // })
    for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(parseInt(formatLargeNumber(data[i].value)))
            });
        }
    }
    return res;
};
  useEffect(() => {
    echarts.registerMap('china', chinaJson);
    const map = echarts.init(mapRef.current);
    const option = {
      backgroundColor: 'transparent',
      title: {
        top: 20,
        left: 100,
        text: '销量地域分布',
        subtext: '',
        x: 'left',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          if (typeof (params.value)[2] == "undefined") {
            //return params.name + ' : ' + params.value;
          } else {//只有数据不为空才显示
            return params.name + ' : ' + params.value[2];
          }
        }
      },          
      visualMap: {//左侧小导航图标
        show: true,
        x: 'left',
        y: 'center',
        top:'260',
        textStyle: {
          color: "#8fc8f2"
        },
        splitList: [
          { start: 200 }, { start: 150, end: 200 },
          { start: 100, end: 150 }, { start: 50, end: 100 },
          { start: 0, end: 50 }
        ],
        color: ['#9fb5ea','#F4E925','#85daef', '#74e2ca', '#e6ac53']
      },
      //布局
      grid: [
        { x: '55%', y: '5%', width: '40%', height: '90%' },
    //  { x: '50%', bottom: '5%', width: '40%', height: '25%' }
      ],
      xAxis: [{
        gridIndex: 0,
        type: 'value',
        axisLabel: {
          show: true,
        },
      }],
      yAxis: [{
        gridIndex: 0,
        type: 'category',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        label: {
          normal: {
              show: true,
          }
        },
        data: (function getXYData() {
          const data = provinceSale;
          const property = "name";
          const res = [];
          data.forEach(function (item) {
            res.push(item[property])
          })
          return res
        })(),
      }],
      tooltip : {
        trigger: 'item'
      },
      //布局e
      geo: {
        show: true,
        map: 'china',
        //  zoom: 1,  //地图绽放
        //  scaleLimit: 2,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#ccc'
            }
          },
          emphasis: {
            show: false,
          }
        },
        roam: true,//是否开启鼠标缩放和平移漫游
        itemStyle: {
          normal: {
            areaColor: 'transparent',
         // borderColor: '#3fdaff',
            borderWidth:1,
            shadowColor: 'rgba(63, 218, 255, 0.5)',
            shadowBlur: 30
          },
          emphasis: {
            areaColor: '#2B91B7',
            color: '#fff'
          }
        }
      },
      //调整显示级别
      layoutCenter: ['25%', '50%'],  
      layoutSize: 400,
      series: [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData2(provinceSale),
          symbolSize: function (val) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: function(a){
                return a.value[2]+"万元";
              },
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          tooltip: {
            formatter: function(a){
              return `${a.name} ${a.seriesName}<br/>${a.value[2]}万元`
            }
          },
        },
        {
          name: '销售额前三名',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData2(provinceSale.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 3)),
          symbolSize: function (val) {
            return val[2] / 10;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: function(a){
                return a.value[2]+"万元";
              },
              position: 'right',
              show: true
            }
          },
          tooltip: {
            formatter: function(a){
              return `${a.name} ${a.seriesName}<br/>${a.value[2]}万元`
            }
          },
          zlevel: 1
        },
/*  {
        type: 'pie',
        z: 2,
        selectedMode: 'single',
        radius: [0, '15%'],        //radius确定饼图的大小
        center: ['20%', '60%'],    //center来确定饼图中心位置
        selectedMode: 'single',
        data: categorySale,
        label: {
           normal: {
              position: 'inner'
            }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        //显示series中信息，提示框组件
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },*/
      {
        id: 'bar',
        name: '年销售额按省份',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        tooltip: {
          formatter:function(a,b,c){
             return `${a.name}<br/>${formatLargeNumber(a.value)}万元`;
          }
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine : {
          data : [
            {type : 'average', name : '平均值'}
          ]
        },
        /* itemStyle: {
        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
          color: function (params) {
            const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
            return colorList[params.dataIndex];
            }
          },*/
        z: 2,
        data: provinceSale
      },
      /*  {
        name: '请假',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
          trigger: 'item',
          formatter: "{a} : {c}"
        },
        data: [1, 3, 2, 4, 1, 4, 3]
      },
      {
        name: '迟到',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
        trigger: 'item',
        formatter: "{a} : {c}"
      },
        data: [1, 2, 3, 4, 3, 2, 2]
      },
      {
        name: '早退',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
          trigger: 'item',
          formatter: "{a} : {c}"
        },
        data: [1, 2, 3, 4, 3, 2, 4]
      },
      {
        name: '调休',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
          trigger: 'item',
          formatter: "{a} : {c}"
        },
        data: [1, 3, 2, 4, 1, 4, 2]
      },
      {
        name: '加班',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
          trigger: 'item',
          formatter: "{a} : {c}"
        },
        data: [1, 3, 2, 4, 1, 4, 2]
      },
      {
        name: '旷工',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        tooltip: {
          trigger: 'item',
          formatter: "{a} : {c}"
        },
        data: [1, 3, 2, 4, 1, 4, 2]
      }*/
      ]
    };
    map.setOption(option);
  }, [])
  return(
    <div ref={mapRef} style={{ height: '400px' }} id="mapContainer" />
  )
}