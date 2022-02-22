import querystring from 'query-string';
import HttpService from '../services/http.service';

export const getOrders = async (query) =>
    await HttpService.get(`merchant/orders?${querystring.stringify(query)}`);

export const getOrder = async (id) => await HttpService.get(`merchant/orders/${id}`);
