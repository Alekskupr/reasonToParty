import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryKeyAC } from '../../redux/action';

const ListItem = (props) => {
  const { data, changeStatusSelect } = props;
  const { value, key } = data;

  const dispatch = useDispatch();

  const selectCountry = () => {
    dispatch(selectCountryKeyAC(key));
    changeStatusSelect();
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
