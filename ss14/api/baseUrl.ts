import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.1.239:8080',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});
export default instance;
