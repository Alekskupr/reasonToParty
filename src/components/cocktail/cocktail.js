import React, { iseState, useEffect } from 'react';
import s from './cocktail.css';

const Cocktail = () => {
  return (
    <svg className = {s.svgCocktail} xmlns="http://www.w3.org/2000/svg" viewBox="0 2 98 98"
    //  width="480" height="480"
     >
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="49" y1="3.333" x2="49" y2="97.669">
        <stop offset="0" stop-color="#00efd1" />
        <stop offset="1" stop-color="#00acea" />
      </linearGradient>
      <path
        d="M67.1 5.6c-9.3 0-16.9 6.8-18.4 15.6H15.3c-1.1 0-2.1.6-2.7 1.6-.5 1-.4 2.2.2 3.1l25.4 36.6v27.9h-11c-1.7 0-3 1.3-3 3s1.3 3 3 3h28c1.7 0 3-1.3 3-3s-1.3-3-3-3h-11V62.5L59 41.1c2.5 1.2 5.3 1.9 8.2 1.9 10.3 0 18.6-8.4 18.6-18.7S77.5 5.6 67.1 5.6zM41.2 56.3L29.4 39.2h23.7L41.2 56.3zm16-23.1h-32l-4.2-6h40.3l-4.1 6zm10 3.8c-1.6 0-3.3-.3-4.7-.9l7-10.2c.6-.9.7-2.1.2-3.1s-1.5-1.6-2.7-1.6H54.8c1.4-5.5 6.4-9.6 12.3-9.6 7 0 12.7 5.7 12.7 12.7S74.2 37 67.2 37z"
        fill="url(#a)"
      />
    </svg>
  );
} 

export default Cocktail;