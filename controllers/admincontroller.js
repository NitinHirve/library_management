
const bcrypt = require('bcrypt');

const Admin_access = require('../models/adminmodel');
const Users = require('../models/usermodel');
const Authors = require('../models/authormodel');
const Books = require('../models/bookmodel');
const IssuedBooks = require('../models/issuedbooksmodel');
const RequestedBooks = require('../models/requestbookmodel');



exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // res.send(req.body);
    const result = await Admin_access.findOne({ username: username });
    if (result) {
        if (await bcrypt.compare(password, result.password)) {

            req.session['adminid'] = result._id;  // session created 
            if (req.session['adminid'])
                res.redirect('/admin/index');
        }
        else
            res.redirect('/admin/login');
    }
    else
        res.redirect('/admin/login');
};


exports.users = async (req, res) => {
    const result = await Users.find({status : {$eq :1 }});
    if (result)
        res.send(result);
};


exports.addUser = async (req, res) => {
    const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user_id: req.body.user_id,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        created_on: req.body.created_on,
        status:1
    });
    const result = await user.save()
    if (result)
        res.redirect('/admin/users');
};


exports.user = async (req, res) => {
    const _id = req.params.id;
    const result = await Users.findById(_id);
    if (result)
        res.send(result);
}

exports.edituser = async (req, res) => {
    const _id = req.params.id;
    const result = await Users.findByIdAndUpdate(_id, req.body);
    if (result) {
        //res.send(result);
        res.redirect('/admin/users');
    }
};

exports.deleteUser = async (req, res) => {
    const _id = req.params.id;
    const result = await Users.findByIdAndUpdate(_id,{status:0});
    if (result)
        return res.redirect('/admin/users');
};


//authors starts

exports.authors = async (req, res) => {
    const result = await Authors.find();
    if (result)
        res.send(result);
}

exports.addAuthor = async (req, res) => {
    const Author = new Authors({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        created_on: req.body.created_on,
    });

    const result = await Author.save()
    if (result)
        res.redirect('/admin/authors');
};

exports.author = async (req, res) => {
    const _id = req.params.id;
    const result = await Authors.findById(_id);
    if (result)
        res.send(result);
}

exports.editauthor = async (req, res) => {
    const _id = req.params.id;
    const result = await Authors.findByIdAndUpdate(_id, req.body);
    if (result) {
        //res.send(result);
        res.redirect('/admin/authors');
    }
};

exports.deleteauthor = async (req, res) => {
    const _id = req.params.id;
    const result = await Authors.findByIdAndDelete(_id, req.body);
    if (result)
        return res.redirect('/admin/authors');
};


//authors end

//books starts

exports.books = async (req, res) => {
    const result = await Books.find();
    console.log(result);
    if (result)
        res.send(result);
}

exports.addbook = async (req, res) => {
    const Book = new Books({
        book_id:req.body.book_id,
        bookname: req.body.bookname,
        description: req.body.description,
        authorName: req.body.authorName,
        numOfCopy: req.body.numOfCopy,
        availableCopy: req.body.availableCopy,
        essuedDate: req.body.essuedDate,
    });

   

    const result = await Book.save()    
    if (result)
        res.redirect('/admin/books');
};

exports.book = async (req, res) => {
    const _id = req.params.id;
    const result = await Books.findById(_id);
    if (result)
        res.send(result);
}

exports.editbook = async (req, res) => {
    const _id = req.params.id;
    const result = await Books.findByIdAndUpdate(_id, req.body);
    if (result) {
        //res.send(result);
        res.redirect('/admin/books');
    }
};

exports.deletebook = async (req, res) => {
    const _id = req.params.id;
    const result = await Books.findByIdAndDelete(_id, req.body);
    if (result)
        return res.redirect('/admin/books');
};

//books end






//issued_books starts

exports.issued_books=  (req, res) => {

    IssuedBooks.aggregate([
        {
         $lookup : {
             from:"users",
             as :"user",
             let:{user_id:"$user_id"},
             pipeline:[
                 {$match:{$expr : {$eq :['$user_id','$$user_id']}}}
             ]
         },  
     },
    //  {   $unwind:"$user_info" },
     {
        $lookup : {
            from:"books",
            as :"book",
            let:{book_id:"$book_id"},
            pipeline:[
                {$match:{$expr : {$eq :['$book_id','$$book_id']}}}
            ]
        },  
    },
     {
         $project:{
             user_id :1,
             book_id:1,
            //  user : 1,
             book_name :"$book.bookname",
             issued_date :1,
             due_date:1,
             return_date:1
         }
     }
 ]).exec((err,result) => {
     if(err)
     res.send(err);
     if(result)
     {
     res.send(result);
     }
 });
};


exports.issuebook =async(req, res)=>{

    const Issuebook = IssuedBooks({
        user_id : req.body.user_id,
        book_id : req.body.book_id,
        issued_date : req.body.issued_date,
        due_date: req.body.due_date
    });
    
    const book_id = req.body.book_id;
   const availableCopy =req.body.availableCopy;
  const newAvailableCopy = availableCopy-1;

  const updatedCopies = await  Books.findOneAndUpdate({book_id:book_id},{availableCopy:newAvailableCopy});

  const result =await Issuebook.save();
  if(result)
   res.redirect('/admin/issued_books');
   
}

// issued_books ends

//book requests starts 

exports.bookrequests = async (req, res) => {

const result = await RequestedBooks.find();
if(result);
res.send(result);

}


exports.issue_requested_book = async (req, res) => {

    const Issuebook = IssuedBooks({
        user_id : req.body.user_id,
        book_id : req.body.book_id,
        issued_date : req.body.issued_date,
        due_date: req.body.due_date
    });

  const _id = req.body._id;
  console.log('Nitin');

  console.log(_id);
  const book_id = req.body.book_id;
  const availableCopy =req.body.availableCopy;
  const newAvailableCopy = availableCopy-1;

  const updatedCopies = await  Books.findOneAndUpdate({book_id:book_id},{availableCopy:newAvailableCopy});
  const result =await Issuebook.save();
  if(result)
  {
  const status = await RequestedBooks.findByIdAndUpdate(_id,{status : 'Issued'});
  if(status)
  res.redirect('/admin/issued_books');
}


}

// book requests ends


