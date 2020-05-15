import React, {iseState, useEffect} from 'react';
import s from './card.css';


const Card = (party) => {
  console.log(party);
  
  return (
    <div className = {s.card}>{party.name}</div>
  )
}


export default Card;