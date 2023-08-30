require("dotenv").config()
const express = require("express");
const connectDB = require("./DB/connection");
const indexRouter  = require("./modules/index.router");
const path = require('path') 
const fs = require('fs') 
const port = process.env.PORT;
const app = express(); 

app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads/')))
app.use('/api/v1/auth',indexRouter.authRouter)
app.use('/api/v1/user',indexRouter.userRouter)
app.use('/api/v1/post',indexRouter.postRouter)
app.use('/api/v1/admin',indexRouter.adminRouter)

const { createInvoice } = require("./service/pdf");
const sendEmail = require("./service/sendEmail");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      userName: "Mohamed",
      email: "pro.mohamednabil@yahoo.com",
      age: 26,
      gender: 'male',
      phone :'01012684270' 
    },
    {
      userName: "Mohamed",
      email: "mohamednabil@gmail.com",
      age: 26,
      gender: 'male',
      phone :'01008801690' 
    }
  ],
  userNumber: 8000,
  paid: 0,
  invoice_nr: 1234
};

createInvoice(invoice, path.join(__dirname,'./uploads/pdf/invoice.pdf'));

// fs.readFileSync  if u use sendGrid
attachment = fs.readFileSync(path.join(__dirname,'./uploads/pdf/invoice.pdf')).toString('base64')

//sendGrid

// sendEmail( "mohamednabil9646@gmail.com",`<p>follow the attachment</p>` ,{
//         content: attachment')
//         filename: 'attachment.pdf',
//         type: 'application/pdf',
//         disposition: 'attachment',
//     }
// )

//nodemailer

// sendEmail( "mohamednabil9646@gmail.com",`<p>follow the attachment</p>` ,[
//     {
//         filename: 'myinvoice.pdf',
//         path: path.join(__dirname,'./uploads/pdf/invoice.pdf')
//     }
// ])

const { initIo } = require("./service/socket");
const userModel = require("./DB/model/User");



connectDB()

const server = app.listen(port,()=>console.log(`server running in port ${port}`))

const io = initIo(server)

io.on('connection',(socket)=>{
  console.log(socket.id);
  socket.on('updateSocketID',async (data)=>{
    await userModel.findByIdAndUpdate(data,{socketID:socket.id})
  })

})
