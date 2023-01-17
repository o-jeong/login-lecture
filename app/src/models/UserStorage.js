// 데이터베이스에 접근하는 모델
"use strict";

const db = require("../config/db")  // 모듈 불러오기

// 클래스명이 파일명과 동일하게 해주는게 좋음
class UserStorage {

    static getUserInfo(id) {
        // 시간이 오래 걸릴때 프로미스를 직접 만들어줌
        // => 소스코드가 user 처럼 분리해서 일을 처리할 수 있게 된다.
        return new Promise((resolve, reject) => {
            // 아래 구문이 성공하면 resolve, 실패하면 reject 실행
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query,[id], (err,data) => {
                if (err) reject(`{err}`);
                resolve(data[0]);
            });
        })
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            // 아래 구문이 성공하면 resolve, 실패하면 reject 실행
            const query = "INSERT INTO users(name, id, pw) VALUES(?,?,?);";
            db.query(query,[userInfo.name, userInfo.id, userInfo.pw], (err) => {
                if (err) reject(`{err}`);
                resolve({ success : true });
            });
        })
    }
}

module.exports = UserStorage;