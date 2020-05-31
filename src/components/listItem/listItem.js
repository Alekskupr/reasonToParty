import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { selectCountryKeyAC } from '../../redux/action';

const ListItem = (props) => {
  const { data } = props;
  const { value, key } = data;
  console.log(key);

  const [selectedCountryKey, setSelectedCountryKey] = useState('');
  const dispatch = useDispatch();

  const selectCountry = () => {
    setSelectedCountryKey(key);
  };

  useEffect(() => {
    dispatch(selectCountryKeyAC(selectedCountryKey));
  }, [selectedCountryKey, dispatch]);

  return (
    <div>
      <div>{JSON.stringify(selectedCountryKey)}</div>
      <li type="button" onClick={selectCountry}>
        {value}
      </li>
    </div>
  );
};

export default ListItem;
