let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();

let signIn = require('./routes/signin');
let signUp = require('./routes/signup');
let questionAndAnswer = require('./routes/questionAndAnswer');

// app.use(logger('dev'));

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signIn', signIn.signin);
app.use('/signUp',signUp.signup);
app.use('/setQuestion',questionAndAnswer.setQuestion);
app.use('/editQuestion',questionAndAnswer.editQuestion);
app.use('/deleteQuestion',questionAndAnswer.deleteQuestion);
app.use('/getAllQuestions',questionAndAnswer.getAllQuestions);
app.use('/getAllDeletedQuestions',questionAndAnswer.getAllDeletedQuestions);

// app.post('/signin',function(req, res) {
//   let p=req.body.password;
//   let u=req.body.username;
//   if(u==='admin@admin.com' && p==='111'){
//           res.status(201).json({output:1});
//         }
//   else{
//     res.status(201).json({output:3});
//   }
// });

module.exports = app;
