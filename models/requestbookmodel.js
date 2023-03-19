const mongoose = require('mongoose');


const requestBookSchema = mongoose.Schema({
    user_id :{
        type :Number,
        required : true
    },
    book_id :{
        type :Number,
        required : true
    },
    book_name :{
        type :String,
        required : true
    },
    request_date:{
        type :Date,
        required : true
    },
    status :{
        type :String,
        required : true
    },   
},
{collection : 'request_books'}
)

const RequestedBooks = mongoose.model('RequestedBooks',requestBookSchema,'request_books');

module.exports = RequestedBooks;

