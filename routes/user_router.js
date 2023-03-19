const express = require('express');
const route = express.Router();
const userServices = require('../services/userrender');
const userController = require('../controllers/usercontroller');


route.get('/login',userServices.login);
route.get('/logout',userServices.logout);
route.get('/index',userServices.index);

route.post('/api/login',userController.login)

//books starts
route.get('/issued_books', userServices.issued_books);
route.get('/returnbooks', userServices.returnbooks);
route.get('/requestbook', userServices.requestbook);
route.get('/requested_books', userServices.requested_books);



route.get('/returnbook/:id',userController.returnbook);
route.get('/api/issued_books',userController.issued_books);
route.get('/api/requested_books',userController.requested_books);
route.post('/api/requestbook',userController.requestbook);

//books ends

module.exports = route;



