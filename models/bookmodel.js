const mongoose = require('mongoose');

const bookSchema= mongoose.Schema({

    book_id :{
        type :Number,
        required : true
    },
    bookname :{
        type :String,
        required : true
    },
    description :{
        type :String,
        required : true
    },
    authorName :{
        type :String,
        required : true
    },
    numOfCopy :{
        type :Number,
        required : true
    },
    availableCopy :{
        type :Number,
        required : true
    }, 
    essuedDate :{
        type :Date,
        required : true
    },

},
{collection:'books'}
)

const Books = mongoose.model('Books',bookSchema,'books');

module.exports = Books;



