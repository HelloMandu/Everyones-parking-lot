import axios from 'axios';

import { Paths } from '../paths';

export const requestPostExtension = async (
    JWT_TOKEN,
    rental_id,
    extension_price,
    payment_type,
    extension_end_time,
    card_id
) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
    // rental_id: 대여 주문 번호
    // end_time: 연장 종료 시간
    // payment_type: 결제 수단
    // extension_price: 연장 추가비

    // * 응답: success / failure
    const URL = Paths.api + 'extension';
    const response = await axios.post(
        URL,
        {
            rental_id,
            extension_price,
            payment_type,
            extension_end_time,
            card_id
        },
        {
            headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
            },
        },
    );

    return response;
};
