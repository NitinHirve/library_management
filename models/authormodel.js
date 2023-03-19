const mongoose = require('mongoose');

const authorSchema= mongoose.Schema({

    firstname :{
        type :String,
        required : true
    },
    lastname :{
        type :String,
        required : true
    },
    username :{
        type :String,
        required : true
    },
    password :{
        type :String,
        required : true
    },
    phone :{
        type :Number,
        required : true
    }, address :{
        type :String,
        required : true
    },
    created_on :{
        type :Date,
        required : true
    },

},
{collection:'authors'}
)

const Authors = mongoose.model('Authors',authorSchema,'authors');

module.exports = Authors;
