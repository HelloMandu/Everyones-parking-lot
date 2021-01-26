import axios from 'axios';

import { Paths } from '../paths';

export const requestGetLike = async (JWT_TOKEN, place_id) => {
    /*
        주차공간 좋아요 유무 요청 API(GET): /api/like
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        place_id: 좋아요 유무 확인할 주차공간 id(Integer, 필수)

        * 응답: status = 좋아요 상태        
    */
    const URL = Paths.api + 'like';
    const options = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
        params: { place_id },
    };
    const response = await axios.get(URL, options);

    return response.data;
};

export const requestPostLike = async (JWT_TOKEN, place_id) => {
    /*
        주차공간 좋아요 추가 요청 API(POST): /api/like
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        place_id: 주차공간 id(Integer, 필수)

        * 응답: status = 변경된 좋아요 상태
    */
    const URL = Paths.api + 'like';
    const options = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.post(URL, { place_id }, options);

    return response.data;
};

export const requestDeleteLike = async (JWT_TOKEN, place_id) => {
    /*
        주차공간 좋아요 제거 요청 API(DELETE): /api/like
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        place_id: 주차공간 id(Integer, 필수)

        * 응답: status = 변경된 좋아요 상태
    */
    const URL = Paths.api + 'like';
    const options = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
        data: {
            place_id,
        },
    };
    const response = await axios.delete(URL, options);

    return response.data;
};
