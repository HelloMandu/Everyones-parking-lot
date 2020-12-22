import axios from 'axios';

import { Paths } from '../paths';

export const requestGetEventList = async () => {
    /*
        이벤트 리스트 요청 API(GET): /api/event

        * 응답: events = [이벤트 Array...]
    */
    const URL = Paths.api + 'event';
    const response = await axios.get(URL);
    return response.data;
};

export const requestGetDetailEvent = async (event_id) => {
    /*
        이벤트 상세 정보 요청 API(GET): /api/event/:event_id
        { params: event_id }: 상세 보기할 이벤트 id(Integer, 필수)

        * 응답: event = { 이벤트 상세 정보 Object }
    */
    const URL = Paths.api + 'event/' + event_id;
    const response = await axios.get(URL);

    return response.data;
};