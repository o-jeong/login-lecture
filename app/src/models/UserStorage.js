"use strict";
// 클래스명이 파일명과 동일하게 해주는게 좋음
class UserStorage {
    static #users = { // 외부에서 내부 데이터에 직접적으로 접근하지 못하도록 은닉화(public->private)
        id: ["jijeong", "ojeong", "yujeong"],
        pw: ["1234", "1234", "123456"],
        name: ["지정", "오정", "유정"],
    };
    // 클래스 자체에서 메서드에 접근하기 위해선 static으로 해줘야함
    static getUsers(...fields){
        const users = this.#users
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){    // users에 field에 해당하는 key값이 있는지 확인 
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        return newUsers;    // 은닉된 private 변수를 반환
    }
}

module.exports = UserStorage;