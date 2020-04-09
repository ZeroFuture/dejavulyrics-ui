import axios from 'axios';

const KEY = process.env.REACT_APP_LAST_FM_KEY;

export default axios.create(
    {
        baseURL: `https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${KEY}&format=json&limit=1`,
        timeout: 50000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
);