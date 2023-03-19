const mongoose = require('mongoose');

const userSchema= mongoose.Schema({

    user_id :{
        type:Number,
        required: true,
        unique: true,
    },

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
        required : true,
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
    status :{
        type:Boolean,
        required : true
    }

},
{collection:'users'}
)


const Users = mongoose.model('Users',userSchema,'users');


module.exports = Users;
