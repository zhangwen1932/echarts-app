export function formatLargeNumber(num){
  num=num/10000;
  num=num.toFixed(2);
  return num;
}