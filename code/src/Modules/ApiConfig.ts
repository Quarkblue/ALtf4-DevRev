
require('dotenv').config();

const apiConfig = {
    baseURL: "https://api.devrev.ai/",
    headers: {
        "Authorization": process.env.PATTOKEN,
    }
}


export  {apiConfig};