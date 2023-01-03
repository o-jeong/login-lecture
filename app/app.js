// express 프레임워크 없이 개발하는 방법
// const http = require("http")  // http는 내장 모듈이므로 따로 다운이 필요 없음
// const app = http.createServer((req,res) => {
//     res.writeHead(200,{ "Content-Type": "text/html; charset=utf-8"})
//     if (req.url == '/'){
//         res.end("여기는 루트입니다.")
//     } else if (req.url == "/login"){
//         res.end("여기는 로그인 화면입니다.")
//     }
// });
// => 프레임워크를 사용해야하는 이유 : 코드가 지저분해짐, 한글 처리를 따로 해줘야함

// app.listen(3001,() => {
//     console.log("http로 가동된 서버");
// });


"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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