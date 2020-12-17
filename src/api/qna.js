import axios from 'axios';

import { Paths } from '../paths';
import makeFormData from '../lib/makeFormData';

export const requestPostWriteQNA = async (JWT_TOKEN, email, subject, question, q_files) => {
    /*
        1:1 문의 작성 요청 API(POST): /api/qna
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        email: 답변 받을 이메일(String, 필수)
        subject: 1:1 문의 제목(String, 필수)
        question: 1:1 문의 내용(String, 필수)
        q_files: 1:1 문의 첨부 파일([FileList])
    
        * 응답: success / failure
    */
    const URL = Paths.api + 'qna';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            ContentType: 'multipart/form-data',
        },
    };
    const formData = makeFormData({ email, subject, question });
    if (q_files) formData.append('q_files', q_files);
    const response = await axios.post(URL, formData, config);

    return response.data;
}

export const requestGetQNAList = async (JWT_TOKEN) => {
    /*
        1:1 문의 리스트 요청 API(GET): /api/qna
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        * 응답: qnas = [1:1 문의 Array...]
    */
    const URL = Paths.api + 'qna';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.get(URL, config);

    return response.data;
}

export const requestGetDetailQNAList = async (JWT_TOKEN, qna_id) => {
    /*
        1:1 문의 상세 정보 요청 API(GET): /api/qna/:qna_id
        { headers }: JWT_TOKEN(유저 로그인 토큰)
        { params: qna_id }: 상세 정보를 가져올 1:1 문의 id

        * 응답: qna = { 1:1 문의 상세 정보 Object }
    */
    const URL = Paths.api + 'qna/' + qna_id;
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.get(URL, config);
    return response.data;
}

export const requestPutReQNAList = async (JWT_TOKEN, qna_id, email, subject, question, q_files) => {
    /*
        1:1 문의 수정 요청 API(PUT): /api/qna/:qna_id
        { headers }: JWT_TOKEN(유저 로그인 토큰)
        { params: qna_id }: 수정할 1:1 문의 id

        email: 답변 받을 이메일(String)
        subject: 1:1 문의 제목(String)
        question: 1:1 문의 내용(String)
        q_files: 1:1 문의 첨부 파일([FileList])

        * 응답: success / failure
    */
    const URL = Paths.api + 'qna/' + qna_id;
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            ContentType: 'multipart/form-data',
        },
    };
    const response = await axios.put(URL, { email, subject, question, q_files }, config);

    return response.data;
}

export const requestDeleteQNAList = async (JWT_TOKEN, qna_id) => {
    /*
        1:1 문의 삭제 요청 API(DELETE): /api/qna/:qna_id
        { params: qna_id }: 삭제할 1:1 문의 id

        * 응답: success / failure
    */
    const URL = Paths.api + 'qna/' + qna_id;
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.delete(URL, config);

    return response.data;
}