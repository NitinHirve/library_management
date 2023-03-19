const axios = require('axios');

const Users = require('../models/usermodel');
const Books = require('../models/bookmodel');


const { render } = require('ejs');

exports.login=(req,res)=>{
    if(req.session['userid'])
   return res.redirect('/user/index');
    res.render('user/login');
}

exports.logout = (req, res) => {
    req.session.destroy((err)=>{
      res.redirect('/user/login');
    });
   
};

exports.index=(req,res)=>{
    if(req.session['userid'])
    res.render('user/index');
    else
    res.redirect('/user/login');

}


//books starts

exports.issued_books= async(req, res) => {
    const result = await  axios.get('http://localhost:8012/user/api/issued_books');
    if(result)
    res.render('user/userissued_books',{users:result.data,userid:req.session['userid']});
  }

  exports.returnbooks =async(req, res) => {
    const result = await  axios.get('http://localhost:8012/user/api/issued_books');
    if(result)
    res.render('user/user_return_books',{users:result.data,userid:req.session['userid']});
  }


  exports.requestbook = async (req, res) => {
    const books=  await Books.find();
      res.render('user/requestbook',{books:books});
  }

  exports.requested_books = async(req, res) => {
    const result = await axios.get('http://localhost:8012/user/api/requested_books');
    res.render('user/requested_books',{books :result.data});

  }




//books ends