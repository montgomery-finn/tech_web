import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:28464',
}) ;

export default api;

export function getError(error: any): string{
    return error?.response?.data;
}