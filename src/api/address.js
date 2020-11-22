import axios from 'axios';

const URL = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'devU01TX0FVVEgyMDIwMTExMTAwMDI0ODExMDQwMDc=';


export const requestAddress = async (search) => {

    const req = URL;
    console.log(search);
    const config ={
        params:{
            confmKey : KEY,
            currentPage:1,
            countPerPage:30,
            keyword:search,
            resultType:'json'
        },
        headers:{
           Accept: "application/json, text/plain, */*",
        }
    }

    const res = await axios.get(req,config);

    return res.data.results.juso;

};

