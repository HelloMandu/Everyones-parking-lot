import axios from 'axios';

import { Paths } from '../paths';

export const requestGetMyPoint = async (JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)

    // * 응답: point_logs: [포인트 사용 기록 Array…]

    const URL = Paths.api + "point_log";
    const response = await axios.get(URL);

    return response;
};

export const requestPostWithdraw = async (JWT_TOKEN, price) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // price: 출금할 액수

    // * 응답: point_logs: [새로운 포인트 사용 기록 Array…]

    const URL = Paths.api + "point_log";
    const response = await axios.post(URL);

    return response;
};