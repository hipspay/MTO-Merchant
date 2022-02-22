import axios from 'axios';

import storage from './storage.service';

const baseURL = process.env.REACT_APP_API;
// const baseURL = 'https://b00b-103-7-79-135.ngrok.io/api';

const http = axios.create({ baseURL: `${baseURL}/` });

async function request(method, url, { headers = {}, params = {}, data }) {
    const secretToken = storage.getItem('token');
    let authHeader = {};

    if (secretToken) authHeader = { authorization: `Bearer ${secretToken}` };

    switch (method) {
        case 'GET':
            return http.get(url, {
                ...params,
                headers: { ...authHeader, ...headers },
            });

        case 'POST':
            return http.post(url, data, {
                ...params,
                headers: { ...authHeader, ...headers },
            });

        case 'PUT':
            return http.put(url, data, {
                headers: { ...authHeader, ...headers },
            });

        case 'DELETE':
            return http.delete(url, {
                headers: { ...authHeader, ...headers },
                data,
            });
        default:
            return http.get(url, {
                ...params,
                headers: { ...authHeader, ...headers },
            });
    }
}

function get(url, headers = {}, params = {}) {
    return request('GET', url, { headers, params });
}

function post(url, data, headers = {}, params = {}) {
    return request('POST', url, { data, headers, params });
}

function put(url, data, headers = {}) {
    return request('PUT', url, { data, headers });
}

function remove(url, data, headers = {}) {
    return request('DELETE', url, { data, headers });
}

export default {
    http,
    get,
    post,
    put,
    remove,
};
