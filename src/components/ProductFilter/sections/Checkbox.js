import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../ProductFilter.module.scss';
// import Continents from './Continents'
import useStore from '../../../hooks/useStore';

const cx = classNames.bind(styles);

function Checkbox({ handleFilter, data }) {
   const [state, dispatch]  = useStore()
   const [checked, setChecked] = useState('');

   const handleToggle = (value) => {
      let newChecked = [...checked];
      const currentIndex = newChecked.indexOf(value);

      // nếu value là tát cả
      if (!value) newChecked = '';

      else if (currentIndex === -1) newChecked.push(value);

      else newChecked.splice(currentIndex, 1);

      // nếu không chọn gì cả
      if (JSON.stringify(newChecked) === '[]') newChecked= '';

      setChecked(newChecked);
      handleFilter(newChecked);
   };

   // cập nhật lại checked từ global state
   useEffect(() => {
      setChecked(state.filters.brand || '')
   }, [state])

   return (
      <>
         {data && data.map((item, index) => {
            return (
               <div key={index} className={cx('filter-item')}>
                  <a to={'/ddtd'}>
                     <input
                     id={item.text}
                        type="checkbox"
                        checked={checked.indexOf(item.href) !== -1 ? true : false}
                        // item.array la cho filter by price
                        onChange={() => handleToggle(item.href)}
                     />
                     <label htmlFor={item.text} className={cx('label')}>{item.text}</label>
                  </a>
               </div>
            );
         })}
      </>
   );
}

export default Checkbox;
