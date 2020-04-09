import axios from 'axios';

export default axios.create({
    baseURL: 'https://dejavulyrics-server.herokuapp.com',
    // baseURL: 'http://localhost:8080',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});