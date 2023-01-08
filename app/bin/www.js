// node 서버의 실행 파일
"use strict"
const port = 3000;
const app = require("../app")
app.listen(port, () => {
    console.log("서버 가동")
}); 