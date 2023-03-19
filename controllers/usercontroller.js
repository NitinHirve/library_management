const Users = require('../models/usermodel');
const IssuedBooks = require('../models/issuedbooksmodel');
const Books = require('../models/bookmodel');
const RequestedBooks = require('../models/requestbookmodel');




exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // res.send(req.body);
    const result = await Users.findOne({ username: username,status:1 });
    if (result) {
        if (password== result.password) {

            req.session.userid =await result.user_id;  // session created 
            req.session.save();
            console.log("user session login console : ",req.session);

            console.log("user login console : ",req.session.userid);
            if (!!req.session['userid'])
                res.redirect('/user/index');

        }
        else
            res.redirect('/user/login');
    }
    else
        res.redirect('/user/login');


};

exports.issued_books=  (req, res) => {

    IssuedBooks.aggregate([
      
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
             _id :1,
             user_id :1,
             book_id:1,
            //  user : 1,
             b_id :"$book._id",
             book_name :"$book.bookname",
             authorname :"$book.authorName",
             description :"$book.description",
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
//books starts

exports.returnbook= async (req,res)=>{

    const issued_id =  req.params.id;
    const issuedBook = await IssuedBooks.findById(issued_id);

    const book_id = issuedBook.book_id;
    console.log(book_id);
    console.log(issued_id);
    const books = await Books.findOne({book_id:book_id});
    console.log(books.availableCopy);
    const availableCopy = books.availableCopy
    const updatedCopy = availableCopy+1;
    console.log(updatedCopy);


    const date = new Date().toISOString().slice(0, 10);

     const bookupdated = await Books.findOneAndUpdate({book_id: book_id},{availableCopy :updatedCopy});
     const returndate = await IssuedBooks.findOneAndUpdate({_id:issued_id},{return_date :date});
     if(bookupdated && returndate)
     res.redirect('/user/returnbooks');
 


};



exports.requested_books = async (req, res) => {
    const user_id =await req.session;
    console.log("My Id Nitin :",user_id);
    const result = await RequestedBooks.find({user_id:{$eq:10101}});
    if(result);
    res.send(result);
}

exports.requestbook= async (req, res) => {
    const user_id = req.session['userid'];
    console.log(user_id);
    const requestBook =  RequestedBooks({
        user_id : user_id,
        book_id : req.body.book_id,
        book_name : req.body.book_name,
        request_date : req.body.request_date,
        status : req.body.status
    });

   const result = requestBook.save();
   if(result)
   res.redirect('/user/requested_books')

}


//books ends