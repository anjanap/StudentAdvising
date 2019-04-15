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
let usefulFunctions = require('./routes/usefulFunctions');

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/signOut', signIn.signOut);
app.use('/signUp',signUp.signUp);
app.use('/approveUser',usefulFunctions.validateSessions,signUp.approveUser);
app.use('/getAllInactiveUsers',usefulFunctions.validateSessions,signUp.getAllInactiveUsers);
app.use('/setQuestionAndAnswer',usefulFunctions.validateSessions,questionAndAnswer.setQuestionAndAnswer);
app.use('/editQuestionAndAnswer',usefulFunctions.validateSessions,questionAndAnswer.editQuestionAndAnswer);
app.use('/deleteQuestionAndAnswer',usefulFunctions.validateSessions,questionAndAnswer.deleteQuestionAndAnswer);
app.use('/getAllQuestionsAndAnswers',usefulFunctions.validateSessions,questionAndAnswer.getAllQuestionsAndAnswers);
app.use('/getAnswer',usefulFunctions.validateSessions,questionAndAnswer.getAnswer);
app.use('/getAllUnansweredQuestions',usefulFunctions.validateSessions,questionAndAnswer.getAllUnansweredQuestions);
app.use('/deleteUnansweredQuestion',usefulFunctions.validateSessions,questionAndAnswer.deleteUnansweredQuestion);
app.use('/getAllMatchingQuestions',usefulFunctions.validateSessions,questionAndAnswer.getAllMatchingQuestions);
app.use('/getAllCategories',usefulFunctions.validateSessions,categories.getAllCategories);
app.use('/setCategory',usefulFunctions.validateSessions,categories.setCategory);
app.use('/getAllAppliesTo',usefulFunctions.validateSessions,appliesTo.getAllAppliesTo);
app.use('/setAppliesTo',usefulFunctions.validateSessions,appliesTo.setAppliesTo);

module.exports = app;
