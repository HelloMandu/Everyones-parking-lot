import axios from 'axios';

import { Paths } from '../paths';

export const requestPostWirteNotice = async (notice_tile, notice_body, notice_img) => {

    /*
        공지사항 작성 요청 API

        notice_title: 공지사항 제목(String, 필수)
        notice_body: 공지사항 내용(String)
        notice_img: 공지사항 첨부 이미지(ImageFileList)

        *응답: success / failure
    */

    const URL = Paths.api + "notice";
    const response = await axios.post(URL);

    return response;
}

export const requestGetNoticeList = async () => {

    /*
        공지사항 리스트 요청 API

        *응답: notices = [공지사항 Array...]
    */

    const URL = Paths.api + "notice";
    const response = await axios.get(URL);

    return response;
}

export const requestGetDetailNotice = async (notice_id) => {

    /*
        공지사항 상세 정보 요청 API

        notice_id: 상세 정보를 가져올 공지사항 id

        *응답: notice = { 공지사항 상세 정보 Object }
    */

    const URL = Paths.api + "notice/:notice_id";
    const response = await axios.get(URL);

    return response;
}

export const requestPutModifyNotice = async (notice_id, notice_title, notice_body, notice_img) => {

    /*
        공지사항 수정 요청 API

        notice_id: 수정할 공지사항 id

        notice_title: 공지사항 제목(String)
        notice_body: 공지사항 내용(String)
        notice_img: 공지사항 첨부 이미지(ImageFileList)

        *응답: success / failure
    */

    const URL = Paths.api + "notice/:notice_id";
    const response = await axios.put(URL);

    return response;
}

export const requestDeleteNotice = async (notice_id) => {

    /*
        공지사항 삭제 요청 API

        notice_id: 삭제할 공지사항 id

        *응답: success / failure
    */

    const URL = Paths.api + "notice/:notice_id";
    const response = await axios.delete(URL);

    return response;
}