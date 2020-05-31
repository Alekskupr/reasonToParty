import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryKeyAC } from '../../redux/action';

const ListItem = (props) => {
  const { data, set } = props;
  const { value, key } = data;

  const [selectedCountryKey, setSelectedCountryKey] = useState('');
  const dispatch = useDispatch();

  const selectedCountryKeyFromFilter = useSelector((store) => {
    return store.selectCountry;
  });

  const selectCountry = () => {
    setSelectedCountryKey(key);
  };

  useEffect(() => {
    dispatch(selectCountryKeyAC(selectedCountryKey));
    if (selectedCountryKeyFromFilter) {
      set();
    }
  }, [selectedCountryKey, dispatch, selectedCountryKeyFromFilter, set]);

  return (
    <div>
      <li type="button" onClick={selectCountry}>
        {value}
      </li>
    </div>
  );
};

export default ListItem;
