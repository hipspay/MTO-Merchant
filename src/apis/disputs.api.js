import querystring from 'query-string';
import HttpService from '../services/http.service';

export const getDisputes = async (query) =>
    await HttpService.get(`merchant/disputes?${querystring.stringify(query)}`);

export const getDispute = async (id) =>
    await HttpService.get(`merchant/disputes/${id}`);
