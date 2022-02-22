import HttpService from '../services/http.service';

export const auth = async (signature) =>
    HttpService.post(`/auth/merchant`, undefined, { signature });
export const profile = async () => HttpService.get(`merchant/profile`);
