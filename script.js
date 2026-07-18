// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // 프론트엔드에서 API를 호출할 수 있도록 허용
app.use(express.json());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // MySQL 사용자명 (기본값 보통 root)
    password: '본인의_DB_비밀번호', // 실제 비밀번호로 변경하세요
    database: 'quiz_db' // 생성한 데이터베이스 이름 (예시)
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL 데이터베이스 연결 성공!');
});

// 1. 메인 화면용 퀴즈 목록 불러오기 API
app.get('/api/quizzes', (req, res) => {
    const query = 'SELECT * FROM quizzes';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. 퀴즈 화면용 특정 퀴즈의 문항 불러오기 API
app.get('/api/quizzes/:id/questions', (req, res) => {
    const quizId = req.params.id;
    const query = 'SELECT * FROM questions WHERE quiz_id = ? ORDER BY question_num ASC';
    db.query(query, [quizId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
