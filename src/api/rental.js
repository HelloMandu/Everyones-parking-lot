import axios from 'axios';

import { Paths } from '../paths';

export const requestPostRental = async (
    JWT_TOKEN,
    place_id,
    cp_id,
    rental_start_time,
    rental_end_time,
    rental_price,
    point_price,
    deposit,
    payment_type,
    card_id,
    phone_number
) => {
    /*
        결제 및 대여 등록 요청 API(POST): /api/rental
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        place_id: 결제할 주차공간 id(Interger, 필수)
        cp_id: 사용할 쿠폰 id(Integer)
        rental_start_time: 대여 시작 시간(DateTimeString, 필수)
        rental_end_time: 대여 종료 시간(DateTimeString, 필수)
        rental_price: 대여비(UNSIGNED Integer, 필수)
        point_price: 사용할 포인트 할인 금액(UNSIGNED Integer)
        deposit: 보증금(UNSIGNED Integer, 필수)
        payment_type: 결제 수단(Integer, 0: 카드 | 1: 카카오페이 | 2: 네이버페이 | 3: 페이코, 필수)
        card_id: 결제 카드 id(Integer, payment_type이 0이면 필수)
        phone_number: 대여자 연락처(String, 필수)

        * 응답: rental_id = 대여 주문 번호
    */
    const URL = Paths.api + "rental";
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    }
    const data = {
        place_id,
        cp_id,
        rental_start_time,
        rental_end_time,
        rental_price,
        point_price,
        deposit,
        payment_type,
        card_id,
        phone_number
    }
    const response = await axios.post(URL, data, config);
    return response.data;
};

export const requestGetConfirmRental = async (JWT_TOKEN, rental_id) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: order: 주문 정보

    const URL = Paths.api + "rental/:rental_id";
    const response = await axios.get(URL);

    return response;
};

export const requestGetUseRental = async (JWT_TOKEN, filter) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // filter: 필터링 항목(아마도 날짜?)

    // * orders:  [주문 정보 Array…]

    const URL = Paths.api + "rental";
    const response = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    });

    return response;
};

export const requestGetDetailUseRental = async (rental_id) => {
    // 이용 내역 상세 정보 요청 API(GET): /api/rental/:rental_id
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: order: 주문 정보

    const URL = Paths.api + `rental/${rental_id}`;
    const JWT_TOKEN = localStorage.getItem('user_id');
    const config = {
        headers:{
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const response = await axios.get(URL, config);
    return response.data;
};

export const requestPutCancelRental = async (JWT_TOKEN, rental_id) => {
    // 대여 취소 신청 API(PUT): /api/rental/:rental_id
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: success / failure

    const URL = Paths.api + 'rental/:rental_id';
    const response = await axios.put(URL);

    return response;
};