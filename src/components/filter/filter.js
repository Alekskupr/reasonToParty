import React, { useState, useEffect, useCallback } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import ListItem from '../listItem/listItem';
import { searchWordAC, selectCountryKeyAC } from '../../redux/action';
import './filter.css';

const FilterPanel = (props) => {
  const { availableCountries, favoriteHolidayHandler } = props;

  const [searchWord, setSearchWord] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const [SelectCountryName, setSelectCountryName] = useState(null);

  const dispatch = useDispatch();

  const onChangeHandlerSearcher = (e) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    dispatch(searchWordAC(searchWord));
  }, [searchWord, dispatch]);

  const changeStatusSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const selectedItem = (objCountry) => {
    dispatch(selectCountryKeyAC(objCountry.key));
    setSelectCountryName(objCountry.value);
    changeStatusSelect();
  };

  const resetSelectCountryKey = () => {
    dispatch(selectCountryKeyAC('all'));
    setSelectCountryName('');
    changeStatusSelect();
  };

  return (
    <div className="containerFilter">
      {/* <div>
        <span className="helloUser">Find your reason:</span>
      </div> */}

      <button type="button" onClick={changeStatusSelect}>
        {SelectCountryName || 'select country'}
      </button>
      {isOpenSelect && (
        <div className="containerCountryList">
          <ul id="country">
            <div>
              <li type="button" onClick={resetSelectCountryKey}>
                all counties
              </li>
            </div>
            {availableCountries.length
              ? availableCountries.map((item, index) => {
                  return <ListItem data={item} key={index} selectedItem={selectedItem} />;
                })
              : ''}
          </ul>
        </div>
      )}
      <input className="searchInput" type="text" onChange={onChangeHandlerSearcher} />
      <button onClick={() => favoriteHolidayHandler()} type="button">
        my favorite holidays
      </button>
    </div>
  );
};

export default FilterPanel;
