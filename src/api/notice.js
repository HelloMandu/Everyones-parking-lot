import axios from 'axios';

import { Paths } from '../paths';

export const requestGetNoticeList = async (URL) => {
    /*
        공지사항 리스트 요청 API(GET): /api/notice

        * 응답: notices = [공지사항 Array...]
    */
    const response = await axios.get(Paths.api + URL);

    return response.data;
}
export const requestGetDetailNotice = async (notice_id) => {

    /*
        공지사항 상세 정보 요청 API(GET): /api/notice/:notice_id
        { params: notice_id }: 상세 정보를 가져올 공지사항 id

        * 응답: notice = { 공지사항 상세 정보 Object }
    */

    const URL = Paths.api + 'notice/' + notice_id;
    const response = await axios.get(URL);

    return response.data;
}