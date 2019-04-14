let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);
let app = express();

let signIn = require('./routes/signin');
let signUp = require('./routes/signup');
let questionAndAnswer = require('./routes/questionAndAnswer');
let categories = require('./routes/categories');
let appliesTo = require('./routes/appliesTo');
let MySQLDB = require('./routes/mysqldb');

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// let options = {
//     host: 'studentadvising.ctahqekfkony.us-east-1.rds.amazonaws.com',
//     port: 3306,
//     user: 'sjsu',
//     password: '11223344',
//     database: 'SJSU_Advising'
// };
var connection = MySQLDB.getConnection();
var sessionStore = new MySQLStore({}, connection);

// let sessionStore = new MySQLStore(options);
app.use(expressSession({
    key: 'key',
    secret: 'password',
    store: sessionStore,
    resave: false,
    saveUninitialized: false}));

app.use('/signIn', signIn.signIn);
app.use('/signUp',signUp.signUp);
app.use('/approveUser',signUp.approveUser);
app.use('/getAllInactiveUsers',signUp.getAllInactiveUsers);
app.use('/setQuestionAndAnswer',questionAndAnswer.setQuestionAndAnswer);
app.use('/editQuestionAndAnswer',questionAndAnswer.editQuestionAndAnswer);
app.use('/deleteQuestionAndAnswer',questionAndAnswer.deleteQuestionAndAnswer);
app.use('/getAllQuestionsAndAnswers',questionAndAnswer.getAllQuestionsAndAnswers);
app.use('/getAnswer',questionAndAnswer.getAnswer);
app.use('/getAllUnansweredQuestions',questionAndAnswer.getAllUnansweredQuestions);
app.use('/deleteUnansweredQuestion',questionAndAnswer.deleteUnansweredQuestion);
app.use('/getAllMatchingQuestions',questionAndAnswer.getAllMatchingQuestions);
app.use('/getAllCategories',categories.getAllCategories);
app.use('/setCategory',categories.setCategory);
app.use('/getAllAppliesTo',appliesTo.getAllAppliesTo);
app.use('/setAppliesTo',appliesTo.setAppliesTo);

module.exports = app;
