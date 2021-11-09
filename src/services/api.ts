import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44342',
}) ;

export default api;