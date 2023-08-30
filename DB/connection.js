const mongoose = require('mongoose') 


const connectDB = ()=>{
    return mongoose.connect(process.env.DBURL2)
    .then(result=>console.log(`connect to DB on URL   .... ${process.env.DBURL}`))
    .catch(err=>console.log(`fail to connect DB`))
}


module.exports = connectDB;
