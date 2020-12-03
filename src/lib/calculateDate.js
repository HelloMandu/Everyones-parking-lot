const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

export const calculateDate = (date, term, type) => {
    const cal_date = new Date(date);
    switch (type) {
        case 'DATE':
            return new Date(cal_date.setDate(cal_date.getDate() - term));
        case 'MONTH':
            return new Date(cal_date.setMonth(cal_date.getMonth() - term));
        case 'YEAR':
            return new Date(
                cal_date.setFullYear(cal_date.getFullYear() - term),
            );
        default:
            return cal_date;
    }
};

// yyyy/mm/dd hh:mm  -> yyyy/mm/dd(화) hh:mm 로 포멧팅
export const calculateDay = (date) => {
    date = date.replace(/-/gi, '/');
    var newArr = date.split(' ');

    const cal_date = new Date(date);
    const day = week[cal_date.getDay()];
    const str = newArr.join(` ${day} `);

    return str;
};

//날짜를 yyyy-mm-dd 로 변환
export const getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    return year + '/' + month + '/' + day;
};

//시작날짜와 끝날짜에 대한 리스트 생성 11/24 (화) ~12/24(수)
export const getDateRange = (start, end) => {
    let res_day = [];
    let ss_day = new Date(start);
    let ee_day = new Date(end);

    //한달 주기 리스트 생성
    while (ss_day.getTime() <= ee_day.getTime()) {
        let month = ss_day.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let date = ss_day.getDate();
        date = date < 10 ? '0' + date : date;
        let day = ss_day.getDay();
        let obj = {
            DAY: month + '/' + date + ' ' + week[day],
            DATE: getFormatDate(
                new Date(`${ss_day.getFullYear()}-${month}-${date}`),
            ),
        };
        res_day.push(obj);
        ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
};

export const getFormatDateTime = (formatted) => {
    const formatDate = new Date(formatted);
    const month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();
    date = date >= 10 ? date : `0${date}`;
    const day = formatDate.getDay();
    let hour = formatDate.getHours();
    hour = hour >= 10 ? hour : `0${hour}`;
    let minute = formatDate.getMinutes();
    minute = minute >= 10 ? minute : `0${minute}`;
    return `${month}/${date}${week[day]} ${hour}:${minute}`;
};

export const getFormatDateNanTime = (formatted) => {
    const formatDate = new Date(formatted);
    const year = formatDate.getFullYear();
    const month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();
    date = date >= 10 ? date : `0${date}`;
    return `${year}/${month}/${date}`;
};
