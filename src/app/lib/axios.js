import axios from 'axios';

const AXIOS_INSTANCE = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/',
    baseURL: 'http://localhost:8000/',

    withCredentials: true, // if using cookies for auth
});

export default AXIOS_INSTANCE;