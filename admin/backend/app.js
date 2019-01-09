var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/signin',function(req, res) {
  var p=req.body.password;
  var u=req.body.username;
  if(u==='admin@admin.com' && p==='111'){
          res.status(201).json({output:1});
        }
  else{
    res.status(201).json({output:0});
  }
});

app.post('/signup',function(req, res) {
  // console.log(req.password+" : "+req.username);
  //       	res.status(201).json({output:0});
});

module.exports = app;
