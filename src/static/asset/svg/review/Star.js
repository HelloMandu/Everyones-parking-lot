import React from 'react';

export default ({ clip, size = 16, onClick = () => {} }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 16 16"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
    >
        <defs>
            <clipPath id="clip-path">
                <rect
                    width={size}
                    height={size}
                    transform="translate(725 3312)"
                    fill="#fff"
                    stroke="#707070"
                    strokeWidth="1"
                />
            </clipPath>
        </defs>
        <g transform="translate(-725 -3312)" clipPath="url(#clip-path)">
            <path
                d="M15.958,5.813a.849.849,0,0,0-.732-.585l-4.618-.419L8.782.535a.85.85,0,0,0-1.564,0L5.392,4.809.773,5.229A.851.851,0,0,0,.291,6.717L3.781,9.778,2.752,14.312a.849.849,0,0,0,1.265.919L8,12.85l3.982,2.381a.85.85,0,0,0,1.265-.919L12.218,9.778l3.491-3.061A.851.851,0,0,0,15.958,5.813Zm0,0"
                transform="translate(725 3312.314)"
                fill={clip ? "#EBEBEB" : "#fbdb21"}
                style={{ transition: 'fill .2s ease-in-out'}}
            />
        </g>
    </svg>
);
