let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();

let signIn = require('./routes/signin');
let signUp = require('./routes/signup');
let questionAndAnswer = require('./routes/questionAndAnswer');
let categories = require('./routes/categories');

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

app.use('/signIn', signIn.signIn);
app.use('/signUp',signUp.signUp);
app.use('/setQuestionAndAnswer',questionAndAnswer.setQuestionAndAnswer);
app.use('/editQuestion',questionAndAnswer.editQuestion);
app.use('/deleteQuestion',questionAndAnswer.deleteQuestion);
app.use('/getAllQuestions',questionAndAnswer.getAllQuestions);
app.use('/getAllDeletedQuestions',questionAndAnswer.getAllDeletedQuestions);
app.use('/getAllCategories',categories.getAllCategories);

module.exports = app;
