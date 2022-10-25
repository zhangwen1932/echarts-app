import { datalist } from '../../data/tableData';
import './style.less';

export default function TableChart(){
  return(
    <div className='table-container'>
    <table className="table border-table darkblue" style={{ width: '100%' }} cellPadding={0} cellSpacing={0}>
      <thead>
      <tr>
        <td className="th" style={{ width: '90px' }}>排名</td>
        <td className="th">区域</td>
        <td className="th td_right">
          年销售量
        </td>
        <td className="th td_right">
          月销售量
        </td>
      </tr>
      </thead>
      <tbody>
      {
        datalist.map((item, index) => (
          <tr key={item.id}>
            <td className="border_bottom border_left_no">{index+1}</td>
            <td className="border_bottom enable">
              {item.area}
            </td>
            <td className="td_right">
              {item.nValue}
            </td>
            <td className="td_right">
              {item.yValue}
            </td>
          </tr>
        ))
      }     
      </tbody>             
    </table>
    </div>
  )
}