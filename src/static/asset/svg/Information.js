const Information = ({fill}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
        >
            <defs>
                <clipPath id="clip-path">
                    <rect
                        id="사각형_1897"
                        data-name="사각형 1897"
                        width="16"
                        height="16"
                        fill={fill ? fill : "#ffe100"}
                        stroke="#707070"
                        strokeWidth="1"
                    />
                </clipPath>
            </defs>
            <g
                id="마스크_그룹_7"
                data-name="마스크 그룹 7"
                clipPath="url(#clip-path)"
            >
                <g id="exclamation-mark-in-a-circle" transform="translate(0)">
                    <path
                        id="패스_178"
                        data-name="패스 178"
                        d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14.695A6.7,6.7,0,1,1,14.7,8,6.695,6.695,0,0,1,8,14.695Z"
                        fill={fill ? fill : "#ffe100"}
                    />
                    <path
                        id="패스_179"
                        data-name="패스 179"
                        d="M10.561,10.489l.325-6.7H8.549l.326,6.7Z"
                        transform="translate(-1.71 -0.759)"
                        fill={fill ? fill : "#ffe100"}
                    />
                    <path
                        id="패스_180"
                        data-name="패스 180"
                        d="M9.677,13.085a1.346,1.346,0,0,0-.031,2.691h.031a1.272,1.272,0,0,0,1.315-1.345A1.273,1.273,0,0,0,9.677,13.085Z"
                        transform="translate(-1.669 -2.617)"
                        fill={fill ? fill : "#ffe100"}
                    />
                </g>
            </g>
        </svg>
    );
};

export default Information;