import React, { useState, useEffect } from 'react';
import s from './partyList.css';

const partyList = data => {
  const { parties } = data;

  const elParty = parties.map((item, index) => {
    return (<li key = {index}>{item.name}</li>)
  })
  return <ul className="containerPartyInfo">{elParty}</ul>;
};

export default partyList;
