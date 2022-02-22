import querystring from 'query-string';
import HttpService from '../services/http.service';

export const getProducts = async (query) =>
    await HttpService.get(`merchant/products?${querystring.stringify(query)}`);

export const createProduct = async (body) =>
    await HttpService.post('merchant/products', body);

export const getProduct = async (id) =>
    await HttpService.get(`merchant/products/${id}`);

export const updateProduct = async (id, body) =>
    await HttpService.put(`merchant/products/${id}`, body);

export const removeProduct = async (id) =>
    await HttpService.remove(`merchant/products/${id}`);
