import axios from 'axios';
import { Paths } from '../paths';

export const requestPostCardEnroll = async (
    JWT_TOKEN,
    card_num,
    valid_term,
    card_password,
) => {
    const URL = Paths.api + 'card';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.post(
        URL,
        {
            card_num,
            valid_term,
            card_password,
        },
        config,
    );
    return response;
};

export const requestGetCardInfo = async (JWT_TOKEN) => {
    const URL = Paths.api + 'card';
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.get(URL, config);
    return response;
};
