import React, { useState, useEffect, useCallback } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import ListItem from '../listItem/listItem';
import { searchWordAC, selectCountryKeyAC } from '../../redux/action';
import c from './filter.css';

const FilterPanel = (props) => {
  const { availableCountries } = props;

  const [searchWord, setSearchWord] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const [SelectCountryName, setSelectCountryName] = useState(null);

  const dispatch = useDispatch();

  // const onChangeHandler = (e) => {
  //   dispatch(selectCountryAC(e.target.value));
  // };

  const onChangeHandlerSearcher = (e) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    dispatch(searchWordAC(searchWord));
  }, [searchWord, dispatch]);

  const changeStatusSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const resetSelectCountryKey = () => {
    dispatch(selectCountryKeyAC(null));
    changeStatusSelect();
  };

  return (
    <div className={c.containerFilter}>
      <p className={c.filterText}>
        Hey! Take advantage of the nearest occasion for a party or find the most suitable one for you:
      </p>

      <button type="button" onClick={changeStatusSelect}>
        Select country
      </button>
      <div className={c.containerCountryList}>
        {isOpenSelect ? (
          <ul id="country">
            <div>
              <li type="button" onClick={resetSelectCountryKey}>
                all counties
              </li>
            </div>
            {availableCountries.length
              ? availableCountries.map((item, index) => {
                  return <ListItem data={item} key={index} changeStatusSelect={changeStatusSelect} />;
                })
              : ''}
          </ul>
        ) : (
          ''
        )}
      </div>
      <input className={c.searchInput} type="text" onChange={onChangeHandlerSearcher} />
      <input type="date" />
      <button type="button">my favorite holidays</button>
    </div>
  );
};

export default FilterPanel;
