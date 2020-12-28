const dotenv = require('dotenv');
dotenv.config();

const config = {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    app_name: process.env.APP_NAME,
    mongo: {
        uri: process.env.MONGO_URI,
        uri_prod: process.env.MONGO_URI_PROD
    }
}

module.exports = config