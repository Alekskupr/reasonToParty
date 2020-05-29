import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { selectCountryAC } from '../../redux/action';
import c from './filter.css';

const FilterPanel = (props) => {
  const { dataPartiesForList } = props;
  console.log(dataPartiesForList);

  // const [selectCountryFilter, setSelectCountryFilter] = useState(0);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(selectCountryAC(e.target.value));
  };

  return (
    <div className={c.containerFilter}>
      <input type="text" />
      <label htmlFor="country">
        select country
        <select id="country" onChange={onChangeHandler}>
          {dataPartiesForList.length
            ? dataPartiesForList.map((item, index) => {
                return (
                  <option key={index} value={item.country}>
                    {item.country}
                  </option>
                );
              })
            : ''}
        </select>
      </label>
      <input type="date" />
      <button type="button">favorite holidays</button>
    </div>
  );
};

export default FilterPanel;
