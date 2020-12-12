import axios from 'axios';
import makeFormData from '../lib/makeFormData';

import { Paths } from '../paths';

export const requsetGetSampleDate = () => {
    // const url ='http://apis.map.kakao.com/download/web/data/chicken.json';
    // const res = await axios.get(url);
    // console.log(res);
    const markerdata = [
        {
            title: '승학주차장',
            distance: 300,
            lat: 35.1158949746728,
            lng: 128.966901860943,
        },
        {
            title: '하남돼지집',
            distance: 300,
            lat: 37.620842424005616,
            lng: 127.1583774403176,
        },
        {
            title: '수유리우동',
            distance: 300,
            lat: 37.624915253753194,
            lng: 127.15122688059974,
        },
        {
            title: '맛닭꼬',
            distance: 300,
            lat: 37.62456273069659,
            lng: 127.15211256646381,
        },
    ];

    return markerdata;
};

export const requestGetParkingList = async (
    lat,
    lng,
    range,
    min_price,
    max_price,
    start_date,
    end_date,
    filter,
) => {
    // lat: 요청할 주차공간의 기준 위도(Float, 필수) => 세로
    // lng: 요청할 주차공간의 기준 경도(Float, 필수) => 가로
    // range: 요청할 주차공간의 거리 범위(Intager, 10km?)
    // min_price: 최소 가격(Intager)
    // max_price: 최대 가격(Intager)
    // start_date: 입차시각(DateTimeString)
    // end_date: 출차시각(DateTimeString)
    // filter: 필터링 항목([type…])

    // * 응답: places: [주차공간 Array…]

    const URL = Paths.api + 'place';
    const params = {
        lat,
        lng,
        range: 1000,
    };
    const response = await axios.get(URL, { params });

    return response;
};

export const requestGetLikeParkingList = async (JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // filter: 전체 같은 필터링이 있는거같긴한데…???

    // * 응답: places: [주차공간 Array…]

    const URL = Paths.api + 'place/like';
    const response = await axios.get(URL);

    return response;
};

export const requestGetDetailParking = async (place_id) => {
    // { params: place_id }: 상세 보기할 주차공간 id(필수)

    // * 응답: place: 주차공간 데이터 Object(리뷰 리스트 데이터도 포함)

    const URL = Paths.api + `place/${place_id}`;

    const response = await axios.get(URL);

    return response;
};

export const requestPutLikeParking = async (JWT_TOKEN, status) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // status: 좋아요 상태(boolean, 필수)

    // * 응답: status: 변경된 좋아요 상태

    const URL = Paths.api + 'place/like';
    const response = await axios.put(URL);

    return response;
};

export const requestGetMyParkingList = async (JWT_TOKEN) => {
    /* 
        내 주차공간 리스트 요청 API

        {headers}: JWT_TOKEN(유저 로그인 토큰)

        *응답: places = [주차공간 Array...]
    */

    const URL = Paths.api + 'place/my';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.get(URL, config);

    return response.data;
};

export const requestPostEnrollParking = async (
    JWT_TOKEN,
    {
        addr,
        addr_detail,
        addr_extra,
        place_type,
        post_num,
        lat,
        lng,
        place_name,
        place_comment,
        place_images,
        place_fee,
        oper_start_time,
        oper_end_time,
    },
) => {
    /*
        주차공간 등록 요청 API

        {headers}: JWT_TOKEN(유저 로그인 토큰)
        addr: 주차공간 주소(String, 필수)
        addr_detail: 주차공간 상세주소(String)
        addr_extra: 주차공간 여분주소(String)
        post_num: 주차공간 우편번호(String)
        place_type: 주차타입(Intager, 필수)
        lat: 주차공간의 위도(Float, 필수) => 세로
        lng: 주차공간의 경도(Float, 필수) => 가로
        place_name: 주차공간 이름(String, 필수)
        place_comment: 주차공간 설명(String, 필수)
        place_images: 주차공간 이미지([FileList], 필수)
        place_fee: 주차공간 요금 / 30분 기준(Intager, 필수)
        oper_start_time: 운영 시작 시간(DateTimeString, 필수)
        oper_end_time: 운영 종료 시간(DateTimeString, 필수)

        *응답: success / failure
    */
   console.log('post')
    const formData = makeFormData({
        addr,
        addr_detail,
        addr_extra,
        post_num,
        lat,
        lng,
        place_name,
        place_comment,
        place_fee,
        oper_start_time,
        oper_end_time,
        place_type,
    });
    const URL = Paths.api + 'place';
    place_images.forEach(({ file }) =>
        formData.append('place_images', file, file.name),
    );
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            ContentType: 'multipart/form-data',
        },
    };
    // return formData;
    const response = await axios.post(URL, formData, config);

    return response;
};

export const requestPutModifyParking = async (
    JWT_TOKEN,
    {
        addr,
        addr_detail,
        addr_extra,
        place_type,
        post_num,
        lat,
        lng,
        place_name,
        place_comment,
        place_images,
        place_fee,
        oper_start_time,
        oper_end_time,
    },
    place_id,
) => {
    /*
        주차공간 수정 요청 API

        {headers}: JWT_TOKEN(유저 로그인 토큰)
        addr: 주차공간 주소(String)
        addr_detail: 주차공간 상세주소(String)
        addr_extra: 주차공간 여분주소(String)
        post_num: 주차공간 우편번호(String)
        lat: 주차공간의 위도(Float) => 세로
        lng: 주차공간의 경도(Float) => 가로
        place_name: 주차공간 이름(String)
        place_comment: 주차공간 설명(String)
        place_img: 주차공간 이미지([FileList])
        place_fee: 주차공간 요금 / 30분 기준(Intager)
        oper_start_time: 운영 시작 시간(DateTimeString)
        oper_end_time: 운영 종료 시간(DateTimeString)

        *응답: success / failure
    */
    console.log('put')
    const formData = makeFormData({
        addr,
        addr_detail,
        addr_extra,
        post_num,
        lat,
        lng,
        place_name,
        place_comment,
        place_fee,
        oper_start_time,
        oper_end_time,
        place_type,
    });
    const URL = Paths.api + `place/${place_id}`;
    place_images.forEach(({ file }) =>
        formData.append('place_images', file, file.name),
    );
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            ContentType: 'multipart/form-data',
        },
    };
    // return formData;
    const response = await axios.put(URL, formData, config);

    return response;
};

export const requestDeleteParking = async (JWT_TOKEN, place_id) => {
    /*
        주차공간 삭제 요청 API

        {headers}: JWT_TOKEN(유저 로그인 토큰)

        *응답: success / failure
    */

    const URL = Paths.api + 'place/:place_id';
    const response = await axios.delete(URL);

    return response;
};

export const requestGetAddressInfo = async (address) => {
    const URL = 'https://dapi.kakao.com/v2/local/search/address.json';
    const response = await axios.get(URL, {
        headers: {
            Authorization: `KakaoAK d747c230bfd2f62cfcf8accd952285b8`,
        },
        params: {
            query: address,
        },
    });
    return response;
};

export const requsetGetAreaInfo = async (lat, lng) => {
    const URL = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
    const response = await axios.get(URL, {
        headers: {
            Authorization: `KakaoAK d747c230bfd2f62cfcf8accd952285b8`,
        },
        params: {
            y: lat,
            x: lng,
        },
    });
    return response;
};
