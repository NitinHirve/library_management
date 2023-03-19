const express = require('express');
const app = express();  
const session = require('express-session');
const ejsLint = require('ejs-lint');
require('./db/connect');

app.set("view engine","ejs");

const addSessionToReq = (req, res, next) => {
    req.session = req.session || {};
    next();
  };

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized : false,
    // cookie : {secure:false},
}));

app.use(addSessionToReq);
app.use(express.json());

app.use(express.urlencoded({extended:false}));




app.use('/admin',require('./routes/admin_router'));
app.use('/user',require('./routes/user_router'));
// app.use('/author',require('./routes/author_router'));



app.listen(8012,()=>console.log("Listening to port 8012"));