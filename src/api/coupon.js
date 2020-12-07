import axios from 'axios';

import { Paths } from '../paths';

export const requestGetCouponMy = async () => {
    /*
        내 쿠폰 리스트 요청 API(GET): /api/coupon/my
        { headers }: JWT_TOKEN(유저 로그인 토큰)
        
        order_type: 정렬 방식

        * 응답: coupons = [쿠폰 Array...]
    */
    const URL = Paths.api + 'coupon/my';
    const JWT_TOKEN = localStorage.getItem('user_id');
    const response = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    });
    return response.data;
};

export const requestGetCouponBook = async () => {
    /*
        쿠폰북 리스트 요청 API(GET): /api/coupon/book
        { headers }: JWT_TOKEN(유저 로그인 토큰)
        
        order_type: 정렬 방식

        * 응답: coupons = [쿠폰 Array...]
    */

    const URL = Paths.api + 'coupon/book';
    const JWT_TOKEN = localStorage.getItem('user_id');
    const response = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    });
    return response.data;
};

export const requestGetCouponUse = async () => {
    /*
        쿠폰 사용 내역 리스트 요청 API(GET): /api/coupon/use
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        * 응답: coupons = [쿠폰 Array...]
    */

    const URL = Paths.api + 'coupon/use';
    const JWT_TOKEN = localStorage.getItem('user_id');
    const response = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    });
    return response.data;
};

export const requestPostCouponCode = async (cp_code) => {
    /*
        쿠폰 코드 입력 요청 API(POST): /api/coupon
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        cp_code: 쿠폰 코드(String, 필수)

        * 응답: success / failure
    */
    const URL = Paths.api + 'coupon';
    const JWT_TOKEN = localStorage.getItem('user_id');
    const response = await axios.post(
        URL,
        { cp_code },
        {
            headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
            },
        },
    );
    return response.data;
};
