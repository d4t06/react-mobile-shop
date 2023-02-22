import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../ProductFilter.module.scss';
import Contiments from './Contiments'

const cx = classNames.bind(styles);

function Checkbox({ handleFilter, category }) {
   const [checked, setChecked] = useState([]);

   const handleToggle = (value) => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) newChecked.push(value);
      else newChecked.splice(currentIndex, 1);

      setChecked(newChecked);
      handleFilter(newChecked);
   };

   return (
      <>
         {Contiments[category].map((item) => {
            return (
               <div key={item.id} className={cx('filter-item')}>
                  <a to={'/ddtd'}>
                     <input
                        type="checkbox"
                        // checked={checked.indexOf(item.value) === -1 ? false : true}
                        //    checked={false}
                        onChange={() => handleToggle(item.array ? item.array : item.value)}
                     />
                     <span className={cx('label')}>{item.value}</span>
                  </a>
               </div>
            );
         })}
      </>
   );
}

export default Checkbox;
