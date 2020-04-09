import axios from 'axios';

export default axios.create({
    baseURL: 'https://dejavulyrics-server.herokuapp.com',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});