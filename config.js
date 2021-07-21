const dotenv = require('dotenv');
dotenv.config();

const DBNAME = process.env.DBNAME;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;
const DBHOST = process.env.DBHOST;

module.exports = {
    DBHOST,
    DBNAME,
    DBPASS,
    DBUSER,
};
