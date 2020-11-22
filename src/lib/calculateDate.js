export const calculateDate = (date, term, type) => {
    const cal_date = new Date(date);
    switch (type) {
        case 'DATE':
            return new Date(cal_date.setDate(cal_date.getDate() - term));
        case 'MONTH':
            return new Date(cal_date.setMonth(cal_date.getMonth() - term));
        case 'YEAR' :
            return new Date(cal_date.setFullYear(cal_date.getFullYear() - term));
        default:
            return cal_date;
    }
}

const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

export const calculateDay = (date) => {
    date = date.replace(/-/gi, '/'); // '2019/09/09 17:22'
    var newArr = date.split(' ');

    const cal_date = new Date(date);
    const day = week[cal_date.getDay()];
    const str = newArr.join(` ${day} `);

    return str;
};

export const  getDateRange =(start, end) =>{

	var res_day = [];
 	var ss_day = new Date(start);
   	var ee_day = new Date(end);    	
  		while(ss_day.getTime() <= ee_day.getTime()){
  			var _mon_ = (ss_day.getMonth()+1);
  			_mon_ = _mon_ < 10 ? '0'+_mon_ : _mon_;
  			var _day_ = ss_day.getDate();
  			_day_ = _day_ < 10 ? '0'+_day_ : _day_;
   			res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' +  _day_);
   			ss_day.setDate(ss_day.getDate() + 1);
       }
    console.log(res_day);
   	return res_day;

};


