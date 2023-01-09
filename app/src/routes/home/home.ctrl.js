"use strict";
const User = require("../../models/User");
const output = {
    hello: (req, res) => {
        res.render('home/index')
    },
    // 위와 같은 문법 (위의 문법은 에크마스크립트 문법!)
    // function hello(req, res) {
    //     res.render('home/index')
    // };
    
    login: (req, res) => {
        res.render('home/login');
    }
};

const process = {
    login: (req,res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    }
}


// hello와 login을 index.js에서 사용할 수 있도록 모듈을 바깥으로 빼준다.
// object 형태로
module.exports = {
    output,
    process
}