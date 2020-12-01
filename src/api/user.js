import axios from 'axios';

import { Paths } from '../paths';
import makeFormData from '../lib/makeFormData';

export const requestGetUserInfo = async (JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)

    // * 응답: user: 유저 정보 Object

    const URL = Paths.api + "user";
    const response = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    });

    return response;
};

export const requestPostSignIn = async (email, password) => {
    // email: 유저 이메일(String, 필수)
    // password: 유저 패스워드(String, 필수)

    // * 응답: success / failure
    // - 카카오 로그인 요청 API(POST): /api/user/kakao 
    // - 네이버 로그인 요청 API(POST): /api/user/naver
    // - 페이스북 로그인 요청 API(POST): /api/user/facebook

    const URL = Paths.api + "user/signin";
    const response = await axios.post(URL, {
        email, password
    });

    return response;
};

export const requestPostAuth = async (email, name, password, birth, phone_number) => {
    // email: 유저 이메일(String, 필수)
    // name: 유저 이름(String, 필수)
    // password: 유저 비밀번호(String, 필수)
    // birth: 유저 생년월일(DateString, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "user";
    const response = await axios.post(URL, {
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        email, name, password, birth, phone_number
    });

    return response;
};

export const requestPutEnrollCar = async (email, car_location, car_num, car_image) => {
    // email: 유저 이메일(String, 필수)
    // car_location: 차량 등록 지역(String, 필수)
    // car_num: 차량 등록 번호(String, 필수)
    // car_image: 차량 이미지(ImageFile, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "user";
    const response = await axios.put(URL);

    return response;
};

export const requestPostFindId = async (name, phone_number, auth_number) => {
    // 아이디 찾기 API(POST): /api/user/find
    // name: 유저 이름(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // auth_number: 인증 번호(String, 필수) => 일단 무시

    // * 응답: email: 유저 이메일 String


    const URL = Paths.api + "user/find";
    const response = await axios.post(URL);

    return response;
};

export const requestPostFindPassword = async (name, email, phone_number, auth_number) => {
    // name: 유저 이름(String, 필수)
    // email: 유저 이메일(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // auth_number: 인증 번호(String, 필수) => 일단 무시

    // * 응답: success / failure

    const URL = Paths.api + "user/find";
    const response = await axios.post(URL);

    return response;
};

export const requestPutResetPassword = async (name, email, phone_number, password) => {
    // name: 유저 이름(String, 필수)
    // email: 유저 이메일(String, 필수)
    // phone_number: 유저 휴대폰 번호(String, 필수)
    // password: 새 비밀번호(String, 필수)

    // * 응답: success / failure

    const URL = Paths.api + "user";
    const response = await axios.put(URL);

    return response;
};

export const requestPutReName = async (JWT_TOKEN, name) => {
    /*
        이름 변경 요청 API(PUT): /api/user/name
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        name: 변경할 이름(String, 필수)

        * 응답: success / failure
    */
    const URL = Paths.api + 'user/name';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.put(URL, { name }, config);
    console.log(response);
    return response.data;
}

export const requestPutRePassword = async (JWT_TOKEN, password) => {
    /*
        비밀번호 재설정 API(PUT): /api/user/password
        { headers }: JWT_TOKEN(유저 임시 토큰 or 유저 로그인 토큰)

        password: 새 비밀번호(String, 필수)
        
        * 응답: success / failure
    */
    const URL = Paths.api + 'user/password';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.put(URL, { password }, config);

    return response.data;
}

export const requestPutRePhoneNumber = async (JWT_TOKEN, phone_number) => {
    /*
        휴대폰 번호 변경 요청 API(PUT): /api/user/phone_number
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        phone_numer: 변경할 휴대폰 번호(String, 필수)

        * 응답: success / failure
    */
    const URL = Paths.api + 'user/phone_number';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.put(URL, { phone_number }, config);

    return response.data;
}

export const requestPutReCarInfo = async (JWT_TOKEN, { car_location, car_num, car_image }) => {
    /*
        차량 정보 등록 요청 API(PUT): /api/user/car_info
        { headers }: JWT_TOKEN(유저 임시 토큰 or 유저 로그인 토큰)
        
        car_location: 차량 등록 지역(String)
        car_num: 차량 등록 번호(String, 필수)
        car_image: 차량 이미지(ImageFile, 필수)
        
        * 응답: success / failure
    */
    const URL = Paths.api + 'user/car_info';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            ContentType: 'multipart/form-data',
        },
    };
    const formData = makeFormData({ car_location, car_num });
    formData.append('car_image', car_image);

    const response = await axios.put(URL, formData, config);

    return response.data;
}

export const requestPutReBirth = async (JWT_TOKEN, birth) => {
    /*
        생년월일 변경 요청 API(PUT): /api/user/birth
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        birth: 변경할 생년월일(DateString, 필수)

        * 응답: success / failure
    */
    const URL = Paths.api + 'user/birth';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.put(URL, { birth }, config);

    return response.data;
}

export const requestDeleteUser = async (JWT_TOKEN) => {
    /*
        회원 탈퇴 요청 API(DELETE): /api/user
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        * 응답: success / failure
    */
    const URL = Paths.api + 'user';
    const response = await axios.delete(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    });

    return response.data;
}