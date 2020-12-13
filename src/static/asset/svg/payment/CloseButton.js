import React from 'react';

const CloseButton = ({ stroke = "#fff" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.828"
            height="18.828"
            viewBox="0 0 18.828 18.828"
        >
            <g
                id="그룹_3973"
                data-name="그룹 3973"
                transform="translate(-309.086 -299.086)"
            >
                <line
                    id="선_658"
                    data-name="선 658"
                    x2="16"
                    y2="16"
                    transform="translate(310.5 300.5)"
                    fill="none"
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    id="선_659"
                    data-name="선 659"
                    x1="16"
                    y2="16"
                    transform="translate(310.5 300.5)"
                    fill="none"
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
};

export default CloseButton;
