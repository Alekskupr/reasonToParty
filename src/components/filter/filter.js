import React, { useState, useEffect, useCallback } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import ListItem from '../listItem/listItem';
import { searchWordAC } from '../../redux/action';
import c from './filter.css';

const FilterPanel = (props) => {
  console.log('powgjwpegjwpefgwpef');
  
  const { availableCountries } = props;

  const [searchWord, setSearchWord] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);

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

  const changeStatusSelect = useCallback(() => {
    setIsOpenSelect(!isOpenSelect);
  }, [isOpenSelect]);

  return (
    <div className={c.containerFilter}>
      <p className={c.filterText}>
        Hey! Take advantage of the nearest occasion for a party or find the most suitable one for you:
      </p>
      <input className={c.searchInput} type="text" onChange={onChangeHandlerSearcher} />

      <button type="button" onClick={changeStatusSelect}>
        select country
      </button>
      <div className={c.containerCountryList}>
        {isOpenSelect ? (
          <ul id="country">
            {availableCountries.length
              ? availableCountries.map((item, index) => {
                  return <ListItem data={item} key={index} set={changeStatusSelect} />;
                })
              : ''}
          </ul>
        ) : (
          ''
        )}
      </div>
      <input type="date" />
      <button type="button">favorite holidays</button>
    </div>
  );
};

export default FilterPanel;
