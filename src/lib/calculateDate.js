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

const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

export const calculateDay = (date) => {
    date = date.replace(/-/gi, '/'); // '2019/09/09 17:22'
    var newArr = date.split(' ');

    const cal_date = new Date(date);
    const day = week[cal_date.getDay()];
    const str = newArr.join(` ${day} `);

    return str;
};

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
        let obj ={
            DAY : month + '/' + date +' '+week[day],
            DATE : new Date(`${ss_day.getFullYear()}-${month}-${date }`),
        }
        res_day.push(month + '/' + date +' '+week[day]);
        ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
};
