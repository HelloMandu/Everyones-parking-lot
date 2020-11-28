
const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

export const calculateDate = (start_date, end_date, start_time , end_time)  => {
    // start_date = getFormatDate(start_date) + ' ' + start_time;
    // end_date = getFormatDate(start_date) + ' ' + end_time;

    const start = new Date(start_date + ' ' + start_time);
    const end = new Date(end_date + ' ' + end_time);
    console.log(start);
    console.log(end);

    const elapsedMSec = end.getTime() - start.getTime(); // 172800000
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 ; // 2

    console.log(elapsedMSec);
    console.log(elapsedDay);

    return elapsedDay;

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
export const getFormatDate =(date)=>{
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var day= date.getDate();
    month = month>=10 ? month : '0'+ month;
    day = day>=10 ? day: '0' +day;
    return year + '/'+month+'/'+day;

}


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
        let obj ={
            DAY : month + '/' + date +' '+week[day],
            DATE : getFormatDate(new Date(`${ss_day.getFullYear()}-${month}-${date }`)),
        }
        res_day.push(obj);
        ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
};
