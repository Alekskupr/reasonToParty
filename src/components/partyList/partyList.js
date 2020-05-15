import React, { useState, useEffect } from 'react';
import s from './partyList.css';
import Card from '../card/card';

const partyList = data => {
  const { parties } = data;

return <div className={s.containerPartyInfo}>{parties ? parties.map((item, index)=>{return <Card {...item} key = {index}/>}) : 'идет загрузка информации'}</div>;
};

export default partyList;
