const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

export const calculateDate = (start_date, end_date, start_time, end_time) => {
    const start = new Date(start_date + ' ' + start_time);
    const end = new Date(end_date + ' ' + end_time);

    const elapsedMSec = end.getTime() - start.getTime(); // 172800000
    const elapsedDay = elapsedMSec / 1000 / 60 / 60; // 2

    const day = Math.floor(elapsedDay / 24);
    const hour = Math.floor(elapsedDay % 24);
    const minute = Math.ceil(
        (Math.abs(hour - (elapsedDay % 24)) * 60).toFixed(1),
    );
    let possible = true;
    if (
        day < 0 ||
        hour < 0 ||
        minute < 0 ||
        (day === 0 && hour === 0 && minute === 0)
    ) {
        possible = false;
    }

    return { day, hour, minute, possible };
};

export const calculatePrice = (total_date, place_fee) => {
    const { day, hour, minute } = total_date;
    const day_price = day * 24 * 2 * place_fee;
    const hour_price = hour * 2 * place_fee;
    const minute_price = Math.ceil(minute / 30) * place_fee;
    return day_price + hour_price + minute_price;
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

export const getFormatDay = (params) => {
    let ss_day = new Date(params);
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
    return obj;
};

//시작날짜와 끝날짜에 대한 리스트 생성 11/24 (화) ~12/24(수)
export const getDateRange = (start, end) => {
    let res_day = [];
    let ss_day = new Date(start);
    let ee_day = new Date(end);

    //한달 주기 리스트 생성
    while (ss_day.getTime() <= ee_day.getTime()) {
        let obj = getFormatDay(ss_day);
        res_day.push(obj);
        ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
};

export const getFormatNewDate = (formatted) => {
    const formatDate = new Date(formatted);
    const month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();
    date = date >= 10 ? date : `0${date}`;
    const day = formatDate.getDay();
    return `${month}/${date}${week[day]}`;
};

export const getFormatNewTime = (formatted) => {
    const formatDate = new Date(formatted);
    let hour = formatDate.getHours();
    hour = hour >= 10 ? hour : `0${hour}`;
    let minute = formatDate.getMinutes();
    minute = minute >= 10 ? minute : `0${minute}`;
    return `${hour}:${minute}`;
};

export const getFormatDateTime = (formatted) => {
    return `${getFormatNewDate(formatted)} ${getFormatNewTime(formatted)}`;
};

// 2020-00-00 00:00:00
export const getFormatDateDetailTime = (formatted) => {
    const formatDate = new Date(formatted);
    const year = formatDate.getFullYear();
    let month = formatDate.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;
    let date = formatDate.getDate();
    date = date >= 10 ? date : `0${date}`;
    let hour = formatDate.getHours();
    hour = hour >= 10 ? hour : `0${hour}`;
    let minute = formatDate.getMinutes();
    minute = minute >= 10 ? minute : `0${minute}`;
    let second = formatDate.getSeconds();
    second = second >= 10 ? second : `0${second}`;
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

// 2020/00/00
export const getFormatDateNanTime = (formatted) => {
    const formatDate = new Date(formatted);
    const year = formatDate.getFullYear();
    const month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();
    date = date >= 10 ? date : `0${date}`;
    return `${year}/${month}/${date}`;
};

// 2020년 0월 0일
export const getFormatDateString = (formatted) => {
    const formatDate = new Date(formatted);
    const year = formatDate.getFullYear();
    const month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();
    // date = date >= 10 ? date : `0${date}`;
    return `${year}년 ${month}월 ${date}일`;
};
