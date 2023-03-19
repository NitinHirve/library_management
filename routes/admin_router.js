const express = require('express');
const route = express.Router();
const adminServices = require('../services/adminrender');
const adminController = require('../controllers/admincontroller');


route.get('/login', adminServices.loginRouter);
route.get('/logout', adminServices.logout);
route.get('/index', adminServices.dashboard);

// users start

route.get('/users', adminServices.users);
route.get('/adduser', adminServices.adduser);
route.get('/edituser/:id', adminServices.edituser);
route.get('/bookrequests', adminServices.bookrequests);
route.get('/rejectrequest/:id', adminServices.rejectrequest);
route.get('/issue_requested_book/:id', adminServices.issue_requested_book);



route.post('/api/login', adminController.login);
route.get('/api/users', adminController.users);
route.get('/api/user/:id', adminController.user);
route.post('/api/adduser', adminController.addUser);
route.post('/api/edituser/:id', adminController.edituser);
route.get('/api/deleteuser/:id', adminController.deleteUser);
route.get('/api/bookrequests', adminController.bookrequests);
route.post('/api/issue_requested_book', adminController.issue_requested_book);


//users end


//authors start

route.get('/authors', adminServices.authors);
route.get('/addauthor', adminServices.addauthor);
route.get('/editauthor/:id', adminServices.editauthor);


route.get('/api/author/:id', adminController.author);
route.post('/api/addauthor', adminController.addAuthor);
route.post('/api/editauthor/:id', adminController.editauthor);
route.get('/api/authors', adminController.authors);
route.get('/api/deleteauthor/:id', adminController.deleteauthor);


//authors end

//books start

route.get('/books', adminServices.books);
route.get('/addbook', adminServices.addbook);
route.get('/editbook/:id', adminServices.editbook);


route.get('/api/book/:id', adminController.book);
route.post('/api/addbook', adminController.addbook);
route.post('/api/editbook/:id', adminController.editbook);
route.get('/api/books', adminController.books);
route.get('/api/deletebook/:id', adminController.deletebook);


//books end

//essued_books start

route.get('/issued_books', adminServices.issued_books)
route.get('/issuebook', adminServices.issuebook);


route.get('/api/issued_books',adminController.issued_books);
route.post('/api/issuebook', adminController.issuebook);




//essued_books end

// route.post('/ajax',(req,res)=>{
//     res.send({response :  req.body.quote});

// })


module.exports = route;