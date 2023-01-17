"use strict";
const logger = require("../../config/logger");
const User = require("../../models/User");
const output = {
    hello: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render('home/index')
    },
    // 위와 같은 문법 (위의 문법은 에크마스크립트 문법!)
    // function hello(req, res) {
    //     res.render('home/index')
    // };
    
    login: (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render('home/login');
    },

    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
};

const process = {
    login: async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.err)
            logger.error(
                `POST /login 200  Response: "success: ${response.success}, ${response.err}"`
                );
        else 
            logger.info(
                `POST /login 200  Response: "success: ${response.success}, msg: ${response.msg}"`
                );
        return res.json(response);
    },
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        if (response.err)
            logger.error(
                `POST /login 200  Response: "success: ${response.success}, ${response.err}"`
                );
        else
            logger.info(`POST /register 200  Response: "success: ${response.success}, msg: ${response.msg}"`);
        return res.json(response);
    }
}


// hello와 login을 index.js에서 사용할 수 있도록 모듈을 바깥으로 빼준다.
// object 형태로
module.exports = {
    output,
    process
}