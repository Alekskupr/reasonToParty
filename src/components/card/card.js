import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './card.css';
import Like from '../like/like';
import { selectPartyNameAC, authorizedUserAC } from '../../redux/action';

const Card = (props) => {
  const { flag, name, date, info, country, like } = props;

  const [isOpenCardInfo, setIsOpenCardInfo] = useState(false);
  const dispatch = useDispatch();

  const changeCard = () => {
    setIsOpenCardInfo(!isOpenCardInfo);
  };

  useEffect(() => {
    setIsOpenCardInfo(false);
  }, [name]);

  useEffect(() => {
    if (isOpenCardInfo) {
      dispatch(selectPartyNameAC(props));
    }
  }, [isOpenCardInfo, dispatch]);

  const likeHandler = () => {
    const favoriteHoliday = { flag, name, date, country, like: !like };
    if (!like) {
      fetch(`/api/parties/party`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ likeHoliday: favoriteHoliday }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.status === 200) {
            dispatch(authorizedUserAC(data.user));
          }
        })
        .catch((err) => console.log('catch', err));
    } else {
      fetch('/api/parties/party', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ likeHoliday: favoriteHoliday }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.status === 200) {
            dispatch(authorizedUserAC(data.user));
          }
        })
        .catch((err) => console.log('err delete party:', err));
    }
  };

  return (
    <div className={isOpenCardInfo ? 'cardOpen' : 'card'}>
      <div className="flagArea">
        <div className="flag">
          {flag ? <img className="flagImage" src={flag} alt={name} /> : <span>не прогрузилось</span>}
        </div>
      </div>
      <div className="nameArea">
        <h4>{name}</h4>
      </div>
      <div className="dateArea">{date}</div>
      {isOpenCardInfo ? (
        <div className="infoArea">
          <span>{info}</span>
        </div>
      ) : (
        ''
      )}
      <div className="country">{country}</div>
      <div className="likeArea">
        <button onClick={changeCard} className="infoButton" type="button">
          {isOpenCardInfo ? <span>Close</span> : <span>Info</span>}
        </button>
        <button onClick={likeHandler} type="button">
          <Like like={like} />
        </button>
      </div>
    </div>
  );
};

export default Card;

/* Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */
/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */
