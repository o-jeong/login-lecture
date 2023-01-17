// node 서버의 실행 파일
"use strict"
const port = process.env.PORT || 3000;
const logger = require("../src/config/logger");
const app = require("../app")
app.listen(port, () => {
    logger.info(`${port} 포트에서 서버가 가동되었습니다.`);
}); 