require('dotenv').config({ path: './config.env'})

// next.config.js
module.exports = {
    publicRuntimeConfig: {
        IEX_API_KEY: process.env.IEX_API_KEY,
        IEX_BASE_URL: process.env.IEX_BASE_URL
    }
}