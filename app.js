var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const uploadRouter = require('./routes/upload');

var app = express();
require('./connections');

const corsOptions = {
  origin: [
    'https://magic556679.github.io',
    'https://magic556679.github.io/BlogWall/#/',
    'https://magic556679.github.io/BlogWall',
    'https://tonyli.website',
    'http://localhost:8080',
    'http://52.195.185.50:8443'
  ],
};

app.use(cors(corsOptions));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/upload', uploadRouter);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});
app.use(history({
  index: '/index.html'
}));
// app.use(express.static('./docs'))
// app.use(history({
//   rewrites: [
//     {
//       from: /^\/assets\/.*$/,
//       to: function(context) {
//         return '/magic556679.github.io/BlogWall/' + context.parsedUrl.pathname;
//       }
//     }
//   ],
//   verbose: true,
//   disableDotRule: true   
// }));
// app.use(express.static(path.join(__dirname, 'docs')));
// app.use('/assets', express.static(path.join(__dirname, 'docs')))


// 自己設定的 err 錯誤 
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    // log 紀錄
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請恰系統管理員'
    });
  }
};
// 開發環境錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
};

app.use(function(err, req, res, next) {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  } 
  // production
  if (err.name === 'ValidationError'){
    err.message = "資料欄位未填寫正確，請重新輸入！"
    err.isOperational = true;
    return resErrorProd(err, res)
  }
  resErrorProd(err, res)
});

module.exports = app;
