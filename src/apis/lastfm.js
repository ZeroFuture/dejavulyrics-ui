// Application name	dejavu lyrics
// API key	17ab8ad666a2d54138b24c02607f9404
// Shared secret	c01a8e76cd0c92dc7e41bc375d459e52
// Registered to	zerofuturezzzzz

import axios from 'axios';

const KEY = process.env.LAST_FM_KEY;

export default axios.create(
    {
        baseURL: `http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${KEY}&format=json&limit=1`,
        timeout: 50000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
);