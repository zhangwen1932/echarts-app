import CountUp from 'react-countup';
import './style.less';

export default function Title() {
  const totalSales = 33710896.94;
  return(
    <div className="caption">
      <div className="main">
        <h2>
          <CountUp
            start={0}
            end={totalSales}
            duration={2.75}
            separator=","
                // decimal=","
          />
          <small className="number warning">20.11%</small>
        </h2>
      </div>
    <div>
        <h6>年销售额(万)(vs去年销售额)</h6>
    </div>
</div>
  )
}