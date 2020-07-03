import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryKeyAC } from '../../redux/action';
import './listItem.css';

const ListItem = (props) => {
  const { data } = props;


  return (
    <button
      type="button"
      value={data.key}
      onClick={(e) => {
        props.filterHandler(e);
      }}
    >
      {data.value}
    </button>
  );
};

export default ListItem;
