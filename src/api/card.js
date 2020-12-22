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
            cvc: 123
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

export const requestDeleteCard = async (JWT_TOKEN, card_id) => {
    const URL = Paths.api + 'card/' + card_id;
    const config = {
        headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
        },
    };
    const response = await axios.delete(URL, config);
    return response;
};
