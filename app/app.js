// 프로젝트 메인 파일 겸 각종 설정
"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
 
const app = express();
dotenv.config();

//라우팅
const home = require("./src/routes/home"); // 해당 경로에 있는 자바스크립트 읽어오기

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`))
//__dirname에는 현재 app.js의 위치를 반환
// 위 주소를 정적 경로로 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app .use('/', home);  // use -> 미들 웨어를 등록해주는 메서드
// 루트 경로로 들어오면 home으로 보내줌

module.exports = app; 