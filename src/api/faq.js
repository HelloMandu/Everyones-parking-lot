import axios from 'axios';

import { Paths } from '../paths';

export const requestPostWirteFAQ = async (question, answer, faq_type) => {
    /*
        자주 묻는 질문 작성 요청 API(POST): /api/faq

        question: 자주 묻는 질문(String, 필수)
        answer: 자주 묻는 질문 답변(String, 필수)
        faq_type: 자주 묻는 질문 타입(Integer, 필수)
    
        * 응답: success / failure
    */
    const URL = Paths.api + 'faq';
    const response = await axios.post(URL, { question, answer, faq_type });

    return response.data;
}

export const requestGetFAQList = async (URL, faq_type) => {
    /*
        자주 묻는 질문 리스트 요청 API(GET): /api/faq

        faq_type: 자주 묻는 질문 타입(Integer, 필수)

        * 응답: faqs = [자주 묻는 질문 Array...]
    */
    const response = await axios.get(Paths.api + URL, { params: { faq_type } });

    return response.data;
}

export const requestDeleteFAQList = async (faq_id) => {
    /*
        자주 묻는 질문 삭제 요청 API(DELETE): /api/faq/:faq_id
        { params: faq_id }: 삭제할 자주 묻는 질문 id

        * 응답: success / failure
    */
    const URL = Paths.api + 'faq/' + faq_id;
    const response = await axios.delete(URL);

    return response.data;
}