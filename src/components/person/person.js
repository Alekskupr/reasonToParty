import React from 'react';
import './person.css';

const Person = () => {
  return (
    <svg className="person" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>person</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="person">
          <g data-name="person">
            <rect className="cls1" />
            <path className="cls2" d="M12,11A4,4,0,1,0,8,7,4,4,0,0,0,12,11Z" />
            <path className="cls2" d="M18,21a1,1,0,0,0,1-1A7,7,0,0,0,5,20a1,1,0,0,0,1,1Z" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Person;
