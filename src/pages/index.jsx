import CurrentMonth from '../components/CurrentMonth';
import MutiPieChart from '../components/MutilPieChart';
import TableChart from '../components/TableChart';
import PieChart from '../components/PieChart';
import Title from '../components/Title';
import MapContainer from '../components/MapContainer';
import CategoryChart from '../components/CategoryChart';
import BarChart from '../components/BarChart';
import 'antd/dist/antd.css'
import './style.less';


export default function HomePage() {
  return (
    <div className="page">
      <div className="header">
        <div className="title">
          2022年度销售总览
        </div>
        <div className="title-bottom">
          <div className="bottom-siderbar"></div>
        </div>
      </div>
      <div className='content flex'>
        <div className='w-2/5'>
          {/* 当前月销售额 */}
            <CurrentMonth />
            <MutiPieChart />
            <TableChart />
            <PieChart />
        </div>
        <div className='w-3/5'>
          <Title />
          <MapContainer />
          <CategoryChart />
          <BarChart />
        </div>
      </div>
    </div>
  );
}
