import React, { useRef, useEffect } from 'react';
import chinaJson from '../../data/map/chinaChange.json';
import { mapData } from '../../data/mapComponents';
import * as echarts from 'echarts';

export default function MapContainer(){
  const mapRef = useRef();
  useEffect(() => {
    echarts.registerMap('china', chinaJson);
    const map = echarts.init(mapRef.current);
    var optionMap = {
      title: {
          text: '全国地图大数据',
          subtext: '',
          x: 'center',
          textStyle: {
              color: "#fff"
          }
      },
      tooltip: {
          trigger: 'item'
      },

      //左侧小导航图标
      visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          textStyle: {
              color: "#8fc8f2"
          },
          splitList: [
              { start: 500, end: 600 }, { start: 400, end: 500 },
              { start: 300, end: 400 }, { start: 200, end: 300 },
              { start: 100, end: 200 }, { start: 0, end: 100 }
          ],
          color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
      },

      //配置属性
      series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
              normal: {
                  show: true  //省份名称  
              },
              emphasis: {
                  show: false
              }
          },
          data: mapData  //数据
      }]
  };
  map.setOption(optionMap);

  }, [])
  return(
    <div ref={mapRef} style={{ height: '400px' }} id="mapContainer" />
  )
}