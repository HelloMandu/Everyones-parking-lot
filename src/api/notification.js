import axios from 'axios';

import { Paths } from '../paths';

export const requestGetNotifications = async (JWT_TOKEN) => {
    /*
        알림 리스트 요청 API(GET): /api/notification
        { headers }: JWT_TOKEN(유저 로그인 토큰)
		
	    응답: notifications = [알림 Array…]
    */
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const URL = Paths.api + 'notification';
    const response = await axios.get(URL, config);

    return response;
}

export const requestPutNotificationRead = async (JWT_TOKEN, notification_id) => {
    /*
        알림 읽음 처리 요청 API(PUT): /api/notification/:notification_id
        { headers }: JWT_TOKEN(유저 로그인 토큰)
        { params: notification_id }: 읽음 처리할 알림 id
		
	    응답: success / failure
    */
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const URL = Paths.api + 'notification/' + notification_id;
    const response = await axios.put(URL, null, config);

    return response;
}

export const requestPutNotificationAllRead = async (JWT_TOKEN) => {
    /*
        알림 전체 읽음 처리 요청 API(PUT): /api/notification
        { headers }: JWT_TOKEN(유저 로그인 토큰)
		
	    응답: success / failure
    */
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    };
    const URL = Paths.api + 'notification';
    const response = await axios.put(URL, null, config);
    
    return response;
}