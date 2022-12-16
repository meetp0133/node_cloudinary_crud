require("dotenv").config()

module.exports = {
    SERVERERROR: 500,
    META_STATUS_0: 0,
    META_STATUS_1: 1,
    SUCCESSFUL: 200,
    EXITING: 200,
    FAILURE: 400,
    DELETED: 3,
    ACTIVE: 1,
    PORT: process.env.PORT,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    MONGO_URL: process.env.MONGO_URL

}