
require('dotenv').config();

const apiConfig = {
    baseURL: "https://api.devrev.ai/",
    headers: {
        "Authorization": process.env.PATTOKEN,
    }
}

const ServiceAccountToken = process.env.SERVICE_ACCOUNT_TOKEN;

export  {apiConfig, ServiceAccountToken};