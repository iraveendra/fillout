require('dotenv').config();
const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
});

module.exports = instance;
