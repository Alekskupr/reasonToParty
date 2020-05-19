import React, { useState, useEffect } from 'react';
import s from './partyList.css';
import Card from '../card/card';

const partyList = data => {

  const { parties, countries } = data;
  
  const [combinedDataParties, setcombinedDataParties] = useState([]);

  const flagSearch = (partiesArr, countriesArr) => {
    for (let i = 0; i < partiesArr.length; i++) {
      const countrySearch = countriesArr.filter(item => 
        item.alpha2Code === partiesArr[i].countryCode);
        partiesArr[i].flag = countrySearch[0].flag;
    } 
    setcombinedDataParties(partiesArr);
  };

  useEffect(() => {
    flagSearch(parties, countries);
  },);

  
  return (
    <div className={s.containerPartyInfo}>
      {combinedDataParties
        ? combinedDataParties.map((item, index) => {
            return <Card party = {item} key={index} />;
          })
        : 'идет загрузка информации'}
    </div>
  );
};

export default partyList;
