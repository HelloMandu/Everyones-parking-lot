import axios from 'axios';

import { Paths } from '../paths';

export const requestPostWriteReview = async (JWT_TOKEN, rental_id, place_id, review_body, review_rating) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // rental_id: 대여 주문 번호
    // place_id: 대여한 주차공간 id ======> DB 변경 필요
    // review_body: 리뷰 내용
    // review_rating: 리뷰 평점

    const URL = Paths.api + "review";
    const response = await axios.post(URL);

    return response;
};

export const requestPutModifyReview = async (JWT_TOKEN, review_id, review_body, review_rating) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // { params: review_id }: 수정할 리뷰 id
    // review_body: 수정할 리뷰 내용
    // review_rating: 수정할 리뷰 평점


    const URL = Paths.api + "review/:review_id";
    const response = await axios.put(URL);

    return response;
};

export const requestGetReviewList = async (JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)

    // * 응답: reviews: [리뷰 Array…]

    const URL = Paths.api + "review";
    const response = await axios.get(URL, {
        headers: {
            'Authorization': `Bearer ${JWT_TOKEN}`
        }
    });

    return response;
};

export const requestGetDetailReview = async (review_id) => {
    // { params: review_id }: 리뷰 id

    // * 응답: review: 리뷰 상세 정보

    const URL = Paths.api + "review/:review_id";
    const response = await axios.get(URL);

    return response;
};

export const requestPostWriteComment = async (JWT_TOKEN, review_id, comment_body) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // review_id: 댓글을 작성할 리뷰 id
    // comment_body: 댓글 내용

    // * 응답: comment: 댓글 정보

    const URL = Paths.api + "comment";
    const response = await axios.post(URL);

    return response;
};