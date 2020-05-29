import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import s from './partyList.css';
import Card from '../card/card';


const PartyList = (props) => {
  const { combinedDataParties } = props;
  // console.log(combinedDataParties);

  // const [combinedDataParties, setcombinedDataParties] = useState([]);

  // useEffect(() => {
  //   const combine = (partiesArr, countriesArr) => {
  //     for (let i = 0; i < partiesArr.length; i++) {
  //       const countrySearch = countriesArr.filter((item) => item.alpha2Code === partiesArr[i].countryCode);
  //       partiesArr[i].flag = countrySearch[0].flag;
  //       partiesArr[i].country = countrySearch[0].name;
  //     }
  //     setcombinedDataParties(partiesArr);
  //   };
  //   combine(parties, countries);
  // }, [parties, countries]);

  return (
    <div className={s.containerPartyInfo}>
      {combinedDataParties
        ? combinedDataParties.map((item, index) => {
            return <Card {...item} key={index} />;
          })
        : 'идет загрузка информации'}
    </div>
  );
};

PartyList.propTypes = {
  combinedDataParties: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PartyList;
