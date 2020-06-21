import React from 'react';
import PropTypes from 'prop-types';
import './partyList.css';
import Card from '../card/card';

const PartyList = (props) => {
  const { dataPartiesForList } = props;
  return (
    <div className="containerPartyInfo">
      {dataPartiesForList.length
        ? dataPartiesForList.map((item, index) => {
            return <Card {...item} key={index} />;
          })
        : 'идет загрузка информации'}
    </div>
  );
};

PartyList.propTypes = {
  dataPartiesForList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PartyList;
