import React, { useState, useEffect, useCallback } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import ListItem from '../listItem/listItem';
import { searchWordAC, selectCountryKeyAC } from '../../redux/action';
import './filter.css';

const FilterPanel = (props) => {
  const { availableCountries } = props;

  const [searchWord, setSearchWord] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const [selectCountryName, setSelectCountryName] = useState(null);

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

  const filterHandler = (e) => {
    setSelectCountryName(e.target.value);
    dispatch(selectCountryKeyAC(e.target.value));
    setIsOpenSelect(false);
  };

  return (
    <div className="containerFilter">
      <button type="button" value="all" onClick={filterHandler}>
        holidays coming up
      </button>
      <button type="button" onClick={changeStatusSelect}>
        select country
      </button>
      {isOpenSelect && (
        <div className="containerCountryList">
          <ul id="country">
            <div>
              <button type="button" value="all" onClick={filterHandler}>
                all counties
              </button>
            </div>
            <div>
              {availableCountries.length
                ? availableCountries.map((item, index) => {
                    return <ListItem data={item} key={index} filterHandler={filterHandler} />;
                  })
                : ''}
            </div>
          </ul>
        </div>
      )}
      <input className="searchInput" type="text" onChange={onChangeHandlerSearcher} />
      <button value="favorite" onClick={filterHandler} type="button">
        my favorite holidays
      </button>
    </div>
  );
};

export default FilterPanel;
