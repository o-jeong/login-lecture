"use strict";

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

const users = {
    id: ["jijeong", "ojeong", "yujeong"],
    pw: ["1234", "1234", "123456"]
};

const process = {
    login: (req,res) => {
        console.log(req.body);   // 프론트엔드에서 전딜한 요청 데이터를 담음
        const id = req.body.id,
            pw = req.body.pw;
        
        // id, pw 검증
        const response = {};
        if (users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if (users.pw[idx] === pw){
                response.success = true;
                return res.json(response);
            }
        }
        response.success = false;
        response.msg = "로그인에 실패하셨습니다."
        return res.json(response);
    }
}


// hello와 login을 index.js에서 사용할 수 있도록 모듈을 바깥으로 빼준다.
// object 형태로
module.exports = {
    output,
    process
}