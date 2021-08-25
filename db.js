require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
});

// const devConfig = `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`;

// const proConfig = process.env.DATABASE_URL; //heroku addons

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === 'production' ? proConfig : devConfig,
// });

module.exports = pool;