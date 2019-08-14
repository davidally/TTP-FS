require('dotenv').config({ path: './config.env'})

// next.config.js
module.exports = {
    useFileSystemPublicRoutes: false,
    // assetPrefix: (process.env.NODE_ENV === 'production') ? null : 'http://localhost:3000',
    publicRuntimeConfig: {
        IEX_API_KEY: process.env.IEX_API_KEY,
        IEX_BASE_URL: process.env.IEX_BASE_URL
    }
}