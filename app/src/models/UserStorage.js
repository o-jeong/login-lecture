"use strict";

const { errorMonitor } = require("events");

const fs = require("fs").promises;
// 클래스명이 파일명과 동일하게 해주는게 좋음
class UserStorage {
    static #getUserInfo(data, id){ // 가독성을 위해 분리
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users); // => {id,pw,name}
        const userInfo = userKeys.reduce((newUser,info) => {
            newUser[info] = users[info][idx]
            return newUser;
        }, {});
        return userInfo;
    }
    
    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data); // data는 버퍼데이터
        if (isAll == true) return users
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){    // users에 field에 해당하는 key값이 있는지 확인 
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        return newUsers;    // 은닉된 private 변수를 반환
    }

    // 클래스 자체에서 메서드에 접근하기 위해선 static으로 해줘야함
    static getUsers(isAll, ...fields){
        return fs.readFile("./src/databases/users.json") // => 프로미스 반환
          .then((data) => {
            return this.#getUsers(data, isAll, fields);
          })
          .catch(console.log);
    }

    static getUserInfo(id) {
        //const users = this.#users;
        return fs.readFile("./src/databases/users.json") // => 프로미스 반환
          .then((data) => {
            return this.#getUserInfo(data, id);
          })
          .catch(console.log);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.pw.push(userInfo.pw);
        users.name.push(userInfo.name);
        // 데이터 추가
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return { success : true };
    }
}

module.exports = UserStorage;