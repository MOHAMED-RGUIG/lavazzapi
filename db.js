const mongoose = require("mongoose")
require("dotenv").config()



mongoose.connect(process.env.MONGODB , {useUnifiedTopology:true,usenewUrlParser:true})

var db = mongoose.connection

db.on('connected',()=>{
    console.log("Mongo DB connection Successful");
})

db.on('error', ()=>{
    console.log('Mongo DB connection failed')
})

module.exports = mongoose