const mysql = require('mysql');
const dbConfig = {
  connectionLimit: process.env.DB_CONNLIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_EXT_PORT
};
const pool = mysql.createPool(dbConfig);

/**
 * @param sql is the query, eg. SELECT * FROM users WHERE id = ?
 * @param params is the array of values to pass to the statement, eg. [1]
 */
const query = async ({ sql, values }) => {
  if (!connectionOk()) console.error('Database unavailable!');
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, rows) => {
      if (err) reject(new Error(err));
      if (rows === undefined) {
        reject(new Error('Rows is undefined'));
      } else {
        resolve(rows);
      }
    });
  });
};

const connectionOk = () => pool.getConnection((err) => !err);

module.exports = {
  query
};
