import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryKeyAC } from '../../redux/action';

const ListItem = (props) => {
  const { data, set } = props;
  const { value, key } = data;

  const dispatch = useDispatch();

  const selectCountry = () => {
    dispatch(selectCountryKeyAC(key));
    set();
  };

  return (
    <div>
      <li type="button" onClick={selectCountry}>
        {value}
      </li>
    </div>
  );
};

export default ListItem;
