import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { selectCountryAC, searchWordAC } from '../../redux/action';
import c from './filter.css';

const FilterPanel = (props) => {
  const { dataPartiesForList } = props;
  // console.log(dataPartiesForList);

  const [searchWord, setSearchWord] = useState('');
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(selectCountryAC(e.target.value));
  };

  const onChangeHandlerSearcher = (e) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    dispatch(searchWordAC(searchWord));
  }, [searchWord, dispatch]);

  return (
    <div className={c.containerFilter}>
      <input type="text" onChange={onChangeHandlerSearcher} />
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
