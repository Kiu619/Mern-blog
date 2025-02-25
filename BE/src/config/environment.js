import 'dotenv/config';

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,

    BUILD_MODE: process.env.BUILD_MODE,
    
    ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,

}