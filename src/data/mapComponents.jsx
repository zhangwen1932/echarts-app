function randomData() {
  return Math.round(Math.random() * 500);
}

export const mapData = [
  { name: '北京', value: '100' }, { name: '天津', value: randomData() },
  { name: '上海', value: randomData() }, { name: '重庆', value: randomData() },
  { name: '河北', value: randomData() }, { name: '河南', value: randomData() },
  { name: '云南', value: randomData() }, { name: '辽宁', value: randomData() },
  { name: '黑龙江', value: randomData() }, { name: '湖南', value: randomData() },
  { name: '安徽', value: randomData() }, { name: '山东', value: randomData() },
  { name: '新疆', value: randomData() }, { name: '江苏', value: randomData() },
  { name: '浙江', value: randomData() }, { name: '江西', value: randomData() }

];