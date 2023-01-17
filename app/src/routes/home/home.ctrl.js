"use strict";
const logger = require("../../config/logger");
const User = require("../../models/User");
const output = {
    hello: (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render('home/index')
    },
    // 위와 같은 문법 (위의 문법은 에크마스크립트 문법!)
    // function hello(req, res) {
    //     res.render('home/index')
    // };
    
    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render('home/login');
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
};

const process = {
    login: async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response);
    },

    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201,
        };
        log(response, url);
        return res.status(url.status).json(response);
    }
}


// hello와 login을 index.js에서 사용할 수 있도록 모듈을 바깥으로 빼준다.
// object 형태로
module.exports = {
    output,
    process
}

const log = (response, url) => {
    if (response.err){
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
        );
    }
    else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`
        );
    }
}