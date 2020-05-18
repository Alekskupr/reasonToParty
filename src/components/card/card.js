import React, {iseState, useEffect} from 'react';
import s from './card.css';


const Card = (party) => {
  console.log(party);
  
  return (
    <div className={s.card}>
      <div className={s.nameArea}>
        {party.name}
        {party.date}
      </div>
      <div className={s.infoArea}>тут будет описание праздника</div>
      <div className={s.emptyArea}>пустая область</div>
      <div className={s.flagArea}>
        <div className = {s.flag}>

        </div>
      </div>
      <div className={s.subflagArea}>пустое место под флагом</div>
      <div className={s.likeArea}>сердечко</div>
    </div>
  );
}


export default Card;