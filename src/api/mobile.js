import axios from 'axios';

import { Paths } from '../paths';

export const requestPostAuth = async (phone_number) => {
    // 휴대폰 인증 번호 요청 API(POST): /api/mobile/auth
    // phone_number: 유저 휴대폰 번호(String, 필수)

    // * 응답: success / failure
    const URL = Paths.api + "mobile/auth";
    const response = await axios.post(URL, {
        phone_number
    });

    return response;
};

export const requestPostConfirm = async (phone_number, auth_number) => {
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // auth_number: 전달 받은 인증 번호(String, 필수)

    // * 응답: success / failure
    const URL = Paths.api + "mobile/confirm";
    const response = await axios.post(URL,{
        phone_number,
        auth_number
    });

    return response;
};