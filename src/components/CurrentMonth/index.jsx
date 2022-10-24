import { currentMonthData } from '../../data/currentMouth';
import { SlackCircleFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import CountUp from 'react-countup';
import './style.less';


const CurrentMonth = () => {
  return (
    <Row gutter={[16, 16]}>
      {currentMonthData.map((item) => (
        <Col key={item.name} span={12} >
          <div className='statistic-item'>
          <div className='icon-box'>
            <SlackCircleFilled />
          </div>
          <div className='text-box'>
            <div className='text'>
              {/* {item.value} */}
              <CountUp
                start={0}
                end={item.value}
                duration={2.75}
                separator=","
                // decimal=","
              />
            </div>
            <div className='sub-title'>
              {item.name}
            </div>
          </div>
          </div>
        </Col>
      ))}
      
    </Row>
  )
}

export default CurrentMonth;