export const areaFormat = (data) => {
    let area = '';
    switch (data) {
        case '부산':
            area = '부산';
            break;
        case '경남':
            area = '경상남도';
            break;
        case '경북':
            area = '경상북도';
            break;
        case '대구':
            area = '대구광역시';
            break;
        case '충북':
            area = '충청북도';
            break;
        case '충남':
            area = '충청남도';
            break;
        case '전북':
            area = '전라북도';
            break;
        case '전남':
            area = '전라남도';
            break;
        case '경기':
            area = '경기도';
            break;
        case '강원':
            area = '강원도';
            break;
        case '서울':
            area = '서울특별시';
            break;
        case '인천':
            area = '인천광역시';
            break;
        case '울산':
            area = '울산광역시';
            break;
        case '세종':
            area = '세종특별시';
            break;
        case '광주':
            area = '광주광역시';
            break;
        default:
            area = data;
            break;
    }
    return area;
};
