import axios from 'axios';
import { Paths } from '../paths';

export const requestGetTestData = async () => {
    /*

    */
   
    const URL = Paths.api + '/user';
    const response = await axios.get(URL);
    return response;
};