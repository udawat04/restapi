const dotenv = require("dotenv");

dotenv.config();

module.exports ={APP_PORT, DB_URL,JWT_SECRET,REFERSH_SECRET}=process.env;