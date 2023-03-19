const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/library_management",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Database connection successfull..."))
.then((err)=>console.log(err));