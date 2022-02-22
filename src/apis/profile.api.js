import querystring from 'query-string';
import HttpService from '../services/http.service';
import { getAddress } from '../utils';

export const getProfile = async () => {
    const address = getAddress();
    return await HttpService.get(
        `merchant/profile?${querystring.stringify({ address })}`
    );
};

export const updateProfile = async (data) => {
    return await HttpService.put('merchant/profile', { ...data });
};
