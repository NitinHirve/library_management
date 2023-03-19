const axios = require('axios');

const Users = require('../models/usermodel');
const Books = require('../models/bookmodel');
const RequestedBooks = require('../models/requestbookmodel');
const { findByIdAndUpdate } = require('../models/usermodel');


exports.loginRouter = (req, res) => {
    if (req.session['adminid'])
        return res.redirect('/admin/index');
    res.render('admin/login');
}

exports.dashboard = (req, res) => {
    if (req.session['adminid'])
        res.render('admin/index');
    else
        res.redirect('/admin/login');
};

exports.logout = (req, res) => {
    console.log("logout");
    req.session.destroy((err) => {
        res.redirect('/admin/login')
    });
};

exports.users = async (req, res) => {
    const result = await axios.get('http://localhost:8012/admin/api/users')
    console.log(result.data);
    if (result.data)
        res.render('admin/users', { users: result.data });
}

exports.adduser = (req, res) => {
 
//    const maxP= Users.find({phone : -1}).limit(1);

Users.find()
   .sort("-user_id")
   .limit(1)
   .exec( (error,data) =>{
       console.log(data[0].user_id);
       const user_id =  data[0].user_id +10;
       if(data[0].user_id)
       res.render('admin/add_user',{user_id:user_id});
       else
       res.render('admin/add_user',{user_id:10100});
    });
  
}

exports.edituser = async (req, res) => {
    const _id = req.params.id
    const result = await axios.get(`http://localhost:8012/admin/api/user/${_id}`)
    console.log(result.data);
    if (result)
        res.render('admin/edituser', { user: result.data });
};



//authors start

exports.authors=  async(req, res) => {
    const result = await axios.get('http://localhost:8012/admin/api/authors')
    console.log(result.data);
    if (result.data)
        res.render('admin/authors', { users: result.data });
}

exports.addauthor = (req, res) => {
    res.render('admin/add_author');
}

exports.editauthor = async (req, res) => {
    const _id = req.params.id
    const result = await axios.get(`http://localhost:8012/admin/api/author/${_id}`)
    console.log(result.data);
    if (result)
        res.render('admin/editauthor', { user: result.data });
};

//authors end

//books start
exports.books=  async(req, res) => {
    const result = await axios.get('http://localhost:8012/admin/api/books')
   // console.log(result.data);
    if (result.data)
        res.render('admin/books', { users: result.data });
}

exports.addbook = (req, res) => {

    Books.find()
   .sort("-book_id")
   .limit(1)
   .exec( (error,data) =>{
       console.log(data[0].book_id);
       const book_id =  data[0].book_id +1;
       if(data[0].book_id)
       res.render('admin/add_book',{book_id:book_id});
       else
       res.render('admin/add_book',{book_id:100});
    });
   // res.render('admin/add_book');
}

exports.editbook = async (req, res) => {
    const _id = req.params.id
    const result = await axios.get(`http://localhost:8012/admin/api/book/${_id}`)
    console.log(result.data);
    if (result)
        res.render('admin/editbook', { user: result.data });
};


//books end


//Issued_books starts

exports.issued_books= async(req, res) => {
  const result = await  axios.get('http://localhost:8012/admin/api/issued_books');
  if(result)
  res.render('admin/issued_books',{users:result.data});
}

exports.issuebook =async (req, res) => {
  const users=  await Users.find({status:{$eq:1}});
  const books=  await Books.find();
  res.render('admin/issuebook',{users:users,books:books});
}


//Issued books ends

//Book requests starts 


exports.bookrequests = async (req, res) => {
 const result = await axios.get('http://localhost:8012/admin/api/bookrequests');
 res.render('admin/requested_books',{requests:result.data});
}

exports.rejectrequest = async (req, res) => {
    const _id = req.params.id
    const result = await RequestedBooks.findByIdAndUpdate(_id,{status : 'Rejected'});
    if(result)
    res.redirect('/admin/bookrequests');
}

exports.issue_requested_book = async (req, res) => {

const _id = req.params.id;
const requestedBook = await RequestedBooks.findById(_id);
 const book_id = requestedBook.book_id
 const book =await Books.findOne({book_id:book_id});
 res.render('admin/issue_requested_book',{request:requestedBook,book:book,_id:_id});

}



// Book request ends

