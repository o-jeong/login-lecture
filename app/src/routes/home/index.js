"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login)
router.post('/register', ctrl.process.register);

// 이 파일을 외부에서 사용할 수 있도록 해준다.
module.exports = router;    // 외부로 내보내기 해줌