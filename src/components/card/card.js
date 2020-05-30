import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './card.css';
import Like from '../like/like';
import { selectPartyNameAC } from '../../redux/action';

const Card = (props) => {
  const party = { ...props };
  const { flag, name, date, info, country } = party;

  const [isOpenCardInfo, setIsOpenCardInfo] = useState(false);
  const dispatch = useDispatch();

  const changeCard = () => {
    dispatch(selectPartyNameAC(party));
    setIsOpenCardInfo(!isOpenCardInfo);
  };

  return (
    <div className={isOpenCardInfo ? s.cardOpen : s.card}>
      {/* <div>{JSON.stringify(party.info)}</div> */}
      <div className={s.flagArea}>
        <div className={s.flag}>
          {flag ? <img className={s.flagImage} src={flag} alt={name} /> : <span>не прогрузилось</span>}
        </div>
      </div>
      <div className={s.nameArea}>
        <h4>{name}</h4>
      </div>
      <div className={s.dateArea}>{date}</div>
      {isOpenCardInfo ? (
        <div className={s.infoArea}>
          <span>{info}</span>
        </div>
      ) : (
        ''
      )}

      <div className={s.country}>{country}</div>
      <div className={s.likeArea}>
        <button onClick={changeCard} className={s.infoButton}>
          {isOpenCardInfo ? <span>Close</span> : <span>INFO</span>}
        </button>
        <button>
          <Like />
        </button>
      </div>
    </div>
  );
};

export default Card;

/* Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */
/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */
