import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { selectCountryAC, searchWordAC } from '../../redux/action';
import c from './filter.css';

const FilterPanel = (props) => {
  const { availableCountries } = props;
  // console.log(availableCountries.length);

  const [searchWord, setSearchWord] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

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

  const selectCountry = (e) => {
    console.log(e.target.value);
  };
  useEffect(
    (e) => {
      // dispatch(selectCountryAC(e.target.value));
    },
    [selectedCountry, dispatch],
  );

  const changeStatusSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

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
          <div className={c.selectDiv} id="country">
            {availableCountries.length
              ? availableCountries.map((item) => {
                  return <input type="button" key={item.key} value={item.value} onClick={selectCountry} />;
                })
              : ''}
          </div>
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
