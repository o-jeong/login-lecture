// 데이터베이스를 설정
const mysql = require("mysql");

// 데이터베이스 설정 기록
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
});

db.connect();  // 설정 기록을 토대로 연결 요청

module.exports = db;