import React, { iseState, useEffect } from 'react';
import './keypad.css';

const Keypad = () => {
  return (
    <svg className="keypad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>keypad</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="keypad">
          <g id="keypad-2" data-name="keypad">
            <rect className="clsKeypad1" width="24" height="24" />
            <path className="clsKeypad2" d="M5,2A3,3,0,1,0,8,5,3,3,0,0,0,5,2Z" />
            <path className="clsKeypad2" d="M12,2a3,3,0,1,0,3,3A3,3,0,0,0,12,2Z" />
            <path className="clsKeypad2" d="M19,8a3,3,0,1,0-3-3A3,3,0,0,0,19,8Z" />
            <path className="clsKeypad2" d="M5,9a3,3,0,1,0,3,3A3,3,0,0,0,5,9Z" />
            <path className="clsKeypad2" d="M12,9a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z" />
            <path className="clsKeypad2" d="M19,9a3,3,0,1,0,3,3A3,3,0,0,0,19,9Z" />
            <path className="clsKeypad2" d="M5,16a3,3,0,1,0,3,3A3,3,0,0,0,5,16Z" />
            <path className="clsKeypad2" d="M12,16a3,3,0,1,0,3,3A3,3,0,0,0,12,16Z" />
            <path className="clsKeypad2" d="M19,16a3,3,0,1,0,3,3A3,3,0,0,0,19,16Z" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Keypad;
