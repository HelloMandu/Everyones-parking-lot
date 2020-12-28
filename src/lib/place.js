export const areaFormat = (data) => {
    let area = '';
    switch (data) {
        case '부산':
            area = { type1: '부산', type2: '부산광역시' };
            break;
        case '경남':
            area = { type1: '경남', type2: '경상남도' };
            break;
        case '경북':
            area = { type1: '경북', type2: '경상북도' };
            break;
        case '대구':
            area = { type1: '대구', type2: '대구광역시' };
            break;
        case '충북':
            area = { type1: '충북', type2: '충청북도' };
            break;
        case '충남':
            area = { type1: '충남', type2: '충청남도' };
            break;
        case '전북':
            area = { type1: '전북', type2: '전라북도' };
            break;
        case '전남':
            area = { type1: '전남', type2: '전라남도' };
            break;
        case '경기':
            area = { type1: '경기', type2: '경기도' };
            break;
        case '강원':
            area = { type1: '강원', type2: '강원도' };
            break;
        case '서울':
            area = { type1: '서울', type2: '서울특별시' };
            break;
        case '인천':
            area = { type1: '인천', type2: '인천광역시' };
            break;
        case '울산':
            area = { type1: '울산', type2: '울산광역시' };
            break;
        case '세종':
            area = { type1: '세종', type2: '세종특별시' };
            break;
        case '광주':
            area = { type1: '광주', type2: '광주광역시' };
            break;
        default:
            area = { type1: data, type2: data };
            break;
    }
    return area;
};
