import axios from 'axios';

import { Paths } from '../paths';

export const requestPostWithdraw = async (JWT_TOKEN, account_number, withdraw_point) => {
    /*
        출금 신청 API(POST): /api/withdraw
        { headers }: JWT_TOKEN(유저 로그인 토큰)

        account_number: 받을 계좌 번호(String, 필수)
        withdraw_point: 출금할 액수(UNSIGNED Integer, 필수)

	    * 응답: success / failure
    */
    const URL = Paths.api + 'withdraw';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.post(URL, { account_number, withdraw_point }, config);

    return response.data;
}