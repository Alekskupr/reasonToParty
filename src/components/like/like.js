import React from 'react';
import './like.css';

const Like = (props) => {
  const { like } = props;
  
  return (
    <svg className="like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>heart</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="heart">
          <g id="heart-2" data-name="heart">
            <rect className="clsLike1" width="24" height="24" />
            <path
              className={like ? 'clsLike2Active' : 'clsLike2'}
              d="M12,21h0a1,1,0,0,1-.71-.29L3.52,12.93a5.26,5.26,0,0,1,0-7.4,5.24,5.24,0,0,1,7.4,0L12,6.61l1.08-1.08a5.24,5.24,0,0,1,7.4,0,5.26,5.26,0,0,1,0,7.4l-7.77,7.78A1,1,0,0,1,12,21Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Like;
