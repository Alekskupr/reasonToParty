import React, { useState, useEffect } from 'react';
import s from './cardInfo.css';
import Like from '../like/like';

const CardInfo = ({ party, info, isOpen }) => {

  console.log(party, info, isOpen);
  
  return (
    isOpen ? 
    (<div className={s.cardInfo}>
      <div className={s.flagArea}>
        <div className={s.flag}>
          {party.flag ? <img className={s.flagImage} src={party.flag} /> : <span>опять не прогрузилось</span>}
        </div>
      </div>
      <div className={s.nameArea}>
        <h4>{party.name}</h4>
      </div>
      <div className={s.dateArea}>{party.date}</div>
      <div className={s.infoArea}>
        {info.length ? <span>{info}</span> : <span>{info.err}</span>}
        {/* {info} */}
      </div>
      <div className={s.emptyArea}>пустая область</div>

      <div className={s.country}>название страны</div>
      <div className={s.likeArea}>
        <button className={s.infoButton}>INFO</button>
        <button>
          <Like />
        </button>
      </div>
    </div>) : null
  );
};

export default CardInfo;
