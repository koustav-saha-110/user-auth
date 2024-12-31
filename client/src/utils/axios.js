import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});

export default axiosInstance;
