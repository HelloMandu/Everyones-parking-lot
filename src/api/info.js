import axios from 'axios';

import { Paths } from '../paths';

export const requestGetAppInfo = async () => {
    // * 응답: info: 앱 정보 Object
    const URL = Paths.api + "app_info";
    const response = await axios.get(URL);
    return response;
};