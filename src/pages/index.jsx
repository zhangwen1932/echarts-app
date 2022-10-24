import CurrentMonth from '../components/CurrentMonth';
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
        <div className='w-1/4'>
          {/* 当前月销售额 */}
          <div>
            <CurrentMonth />
          </div>
        </div>
        <div className='w-3/4'>测试3/4</div>
      </div>
    </div>
  );
}
