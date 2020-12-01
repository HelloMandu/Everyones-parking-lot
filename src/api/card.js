import axios from 'axios';
import { Paths } from '../paths';

export const requestPostCardEnroll = async (JWT_TOKEN, card_num) => {
    const URL = Paths.api + 'card';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.post(
        URL,
        {
            bank_name: '국민은행',
            card_num,
        },
        config,
    );
    return response;
};
