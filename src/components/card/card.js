import React, {iseState, useEffect} from 'react';
import s from './card.css';
import Like from '../like/like';


const Card = ({party, info}) => {
  
  return (
    <div className={s.card}>
      <div className={s.flagArea}>
        <div className={s.flag}>
          {party.flag ? <img className={s.flagImage} src={party.flag} /> : <span>опять не прогрузилось</span>}
        </div>
      </div>
      <div className={s.nameArea}>
      <h4>{party.name}</h4>
      </div>
      <div className={s.dateArea}>{party.date}</div>
      {/* <div className={s.infoArea}> */}
      {/* {info ? <span>{info.sections[0].paragraphs[0].sentences[0].text}</span> : ''} */}
      {/* {info.length ? <span>{info}</span> : <span>{info.err}</span>} */}
      {/* {info} */}
      {/* </div> */}
      {/* <div className={s.emptyArea}>пустая область</div> */}

      <div className={s.country}>название страны</div>
      <div className={s.likeArea}>
        <button className = {s.infoButton}>INFO</button>
        <button>
          <Like />
        </button>
      </div>
    </div>
  );
}


export default Card;

/*Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */
/*Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>*/