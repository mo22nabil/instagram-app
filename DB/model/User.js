const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    userName:{type:String , required:true},
    firstName:String,
    lastName:String,
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    age:{type:Number , required:true},
    phone:{type:String },
    gender:{type:String , required:true,enum:['Male','Female'],default:'Male'},
    confiremail:{type:Boolean , default:false},
    profilePic:{type:String},
    coverPic:{type:Array},
    gallary:{type:Array},
    online:{type:Boolean ,default:false},
    follower:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    role:{type:String,default:'User'},
    isBlocked:{type:Boolean,default:false},
    socialLink:Array,
    pdfLink:String,
    story:Array,
    code:String,
    lastSeen :String, 
    socketID :String 
},{timestamps:true})



userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRounds))
    next()
})

userSchema.pre('findOneAndUpdate',async function(next){
    const hookdata = await this.model.findOne(this.getQuery()).select('__v')
    this.set({__v : hookdata.__v+1})
    next();
})

const userModel = mongoose.model('User',userSchema)



module.exports=userModel