const mongoose = require('mongoose');


const issuedBookSchema = mongoose.Schema({
    user_id:{
        type:Number,
        required: true,
    },
    book_id:{
        type:Number,
        required: true,
    },
    issued_date:{
        type:Date,
        required: true,
    },
    due_date:{
        type:Date,
        required: true,
    },
    return_date:{
        type:Date,
    },

},
{collection:'issued_books'}
);


const IssuedBooks = mongoose.model('IssuedBooks',issuedBookSchema,'issued_books');

module.exports = IssuedBooks;