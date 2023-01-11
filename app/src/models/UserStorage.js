"use strict";

const fs = require("fs").promises;
// 클래스명이 파일명과 동일하게 해주는게 좋음
class UserStorage {
    
    // 클래스 자체에서 메서드에 접근하기 위해선 static으로 해줘야함
    static getUsers(...fields){
        // const users = this.#users
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){    // users에 field에 해당하는 key값이 있는지 확인 
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        return newUsers;    // 은닉된 private 변수를 반환
    }

    static getUserInfo(id) {
        //const users = this.#users;
        return fs.readFile("./src/databases/users.json") // => 프로미스 반환
          .then((data) => {
            const users = JSON.parse(data);
            const idx = users.id.indexOf(id);
            const userKeys = Object.keys(users); // => {id,pw,name}
            const userInfo = userKeys.reduce((newUser,info) => {
                newUser[info] = users[info][idx]
                return newUser;
            }, {});
            console.log(userInfo)
            return userInfo;
          })
          .catch(console.log);
    }

    static save(userInfo) {
        //const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.pw.push(userInfo.pw);
        return { success : true };
    }
}

module.exports = UserStorage;