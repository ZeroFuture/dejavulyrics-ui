import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});