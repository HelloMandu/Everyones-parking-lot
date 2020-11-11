import axios from 'axios'

import makeFormData from '../lib/makeFormData'

import { Paths } from '../paths'

export const requestPostRental = async (JWT_TOKEN, {
    place_id,
    coupon_id,
    start_time,
    end_time,
    payment_time,
    rental_price,
    deposite,
    point_price,
    coupon_price,
    phone_number
}) => {

    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // place_id: 결제할 주차공간 id
    // coupon_id: 사용할 쿠폰 id
    // start_time: 대여 시작 시간
    // end_time: 대여 종료 시간
    // payment_type: 결제 수단
    // rental_price: 대여비
    // deposit: 보증금
    // point_price: 사용할 포인트 할인액
    // coupon_price: 사용할 쿠폰 할인액
    // phone_number: 대여자 연락처 ======> DB 변경 필요

    // * 응답: rental_id: 대여 주문 번호

    const formData = makeFormData({
        place_id,
        coupon_id,
        start_time,
        end_time,
        payment_time,
        rental_price,
        deposite,
        point_price,
        coupon_price,
        phone_number
    })

    const URL = Paths.api + "api/rental"
    const response = await axios.post(URL, formData)

    return response
}

export const requestGetConfirmRental = async (JWT_TOKEN, rental_id) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: order: 주문 정보

    const config = {
        params: {
            rental_id: rental_id
        }
    }

    const URL = Paths.api + "api/rental/rental_id"
    const response = await axios.get(URL, config)

    return response
}

export const requestGetUseRental = async (JWT_TOKEN, filter) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // filter: 필터링 항목(아마도 날짜?)

    // * orders:  [주문 정보 Array…]

    const URL = Paths.api + "api/rental"
    const response = await axios.get(URL)

    return response
}

export const requestGetDetailUseRental = async (JWT_TOKEN, rental_id) => {
    // 이용 내역 상세 정보 요청 API(GET): /api/rental/:rental_id
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: order: 주문 정보

    const config = {
        params: {
            rental_id: rental_id
        }
    }

    const URL = Paths.api + "api/rental/rental_id"
    const response = await axios.get(URL, config)

    return response
}

export const requestPutCancelRental = async (JWT_TOKEN, { rental_id }) => {
    // 대여 취소 신청 API(PUT): /api/rental/:rental_id
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: rental_id }: 대여 주문 번호

    // * 응답: success / failure

    let params = new URLSearchParams()
    params.append(rental_id)

    const URL = Paths.api + `api/rental/`
    const response = await axios.put(URL, params)

    return response
}