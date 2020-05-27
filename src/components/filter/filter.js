import React, { useState, useEffect } from 'react';
import c from './filter.css';

const FilterPanel = data => {
  const { countries } = data;
  const [selectCountyFilter, setSelectCountryFilter] = useState(0);

  const onChangeHandler = e => {
    setSelectCountryFilter(e.target.value);
  };

  return (
    <div className={c.containerFilter}>
      <input></input>
      <div>{JSON.stringify(selectCountyFilter)}</div>
      <select onChange={onChangeHandler}>
        {countries.length
          ? countries.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })
          : ''}
      </select>
      <input type="date"></input>
      <button>favorite holidays</button>
    </div>
  );
};

export default FilterPanel;
