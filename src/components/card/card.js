import React, {iseState, useEffect} from 'react';
import s from './card.css';


const Card = ({party, info}) => {
  return (
    <div className={s.card}>
      <div className={s.nameArea}>
        {party.name}
        {party.date}
      </div>
      <div className={s.infoArea}>
        {info ? <span>{info.sections[0].paragraphs[0].sentences[0].text}</span> : ''}
        
      </div>
      <div className={s.emptyArea}>пустая область</div>
      <div className={s.flagArea}>
        <div className={s.flag}>
          {party.flag ? <img className={s.flagImage} src={party.flag} /> : <span>опять не прогрузилось</span>}
        </div>
      </div>
      <div className={s.subflagArea}>пустое место под флагом</div>
      <div className={s.likeArea}>сердечко</div>
    </div>
  );
}


export default Card;