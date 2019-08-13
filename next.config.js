require('dotenv').config({ path: './config.env'})

// next.config.js
module.exports = {
    useFileSystemPublicRoutes: false,
    publicRuntimeConfig: {
        IEX_API_KEY: process.env.IEX_API_KEY
    }
}