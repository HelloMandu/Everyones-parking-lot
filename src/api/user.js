import axios from 'axios';

import { Paths } from '../paths';

export const requestGetUserInfo = async (JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)

    // * 응답: user: 유저 정보 Object

    const URL = Paths.api + "api/user";
    const response = await axios.get(URL);

    return response;
};

export const requestPostSignIn = async (email, password) => {
    // email: 유저 이메일(String, 필수)
    // password: 유저 패스워드(String, 필수)

    // * 응답: success / failure
    // - 카카오 로그인 요청 API(POST): /api/user/kakao 
    // - 네이버 로그인 요청 API(POST): /api/user/naver
    // - 페이스북 로그인 요청 API(POST): /api/user/facebook

    const URL = Paths.api + "api/user/signin";
    const response = await axios.post(URL);

    return response;
};

export const requestPostAuth = async (email, name, password, birth, phone_number) => {
    // email: 유저 이메일(String, 필수)
    // name: 유저 이름(String, 필수)
    // password: 유저 비밀번호(String, 필수)
    // birth: 유저 생년월일(DateString, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "api/user";
    const response = await axios.post(URL);

    return response;
};

export const requestPutEnrollCar = async (email, car_location, car_num, car_image) => {
    // email: 유저 이메일(String, 필수)
    // car_location: 차량 등록 지역(String, 필수)
    // car_num: 차량 등록 번호(String, 필수)
    // car_image: 차량 이미지(ImageFile, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "api/user";
    const response = await axios.put(URL);

    return response;
};

export const requestPostFindId = async (name, phone_number, auth_number) => {
    // 아이디 찾기 API(POST): /api/user/find
    // name: 유저 이름(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // auth_number: 인증 번호(String, 필수) => 일단 무시

    // * 응답: email: 유저 이메일 String


    const URL = Paths.api + "api/user/find";
    const response = await axios.post(URL);

    return response;
};

export const requestPostFindPassword = async (name, email, phone_number, auth_number) => {
    // name: 유저 이름(String, 필수)
    // email: 유저 이메일(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // auth_number: 인증 번호(String, 필수) => 일단 무시

    // * 응답: success / failure

    const URL = Paths.api + "api/user/find";
    const response = await axios.post(URL);

    return response;
};

export const requestPutResetPassword = async (name, email, phone_number, password) => {
    // name: 유저 이름(String, 필수)
    // email: 유저 이메일(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // password: 새 비밀번호(String, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "api/user";
    const response = await axios.put(URL);

    return response;
};