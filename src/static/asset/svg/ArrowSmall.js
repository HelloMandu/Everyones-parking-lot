import React from 'react';

const getDirectionAngle = rotate => rotate + 180;

const ArrowSmall = ({ rotate = 0 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.414"
        height="5.207"
        viewBox="0 0 9.414 5.207"
        style={{ transform: `rotate(${getDirectionAngle(rotate)}deg)` }}
    >
        <path
            d="M-857.63,603.173l4-4,4,4"
            transform="translate(-848.923 603.88) rotate(180)"
            fill="none"
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
        />
    </svg>
);

export default ArrowSmall;
