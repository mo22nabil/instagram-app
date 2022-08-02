const userModel = require("../../../DB/model/User");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const sendEmail = require("../../../service/sendEmail");


const signup =async (req , res)=>{
   try {
       
       const {userName , password , email ,age , gender} = req.body; 
       const newUser = new userModel({userName , password , email ,age , gender});
       const savedUser =await newUser.save();
       const token = jwt.sign({id:savedUser._id},process.env.emailTokenSecret,{expiresIn:60*5})
       const URL =`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}` 
       const URL2 =`${req.protocol}://${req.headers.host}/api/v1/auth/resendToken/${savedUser._id}` 
       const message = `<a href=${URL}>plz follow me to confirm your email</a>
       </br>
       <a href=${URL2}>refresh token</a>
       `
       await sendEmail(savedUser.email,message)
       res.status(201).json({message:"Done",savedUser})
    } catch (error) {
        if (error.keyValue?.email) {
            res.status(409).json({message:"email exist"})
        }
       res.status(500).json({message:"catch error",error})
   }
}

const   confirmEmail =async (req , res)=>{
   try {
       const {token} = req.params; 
        const decoded = jwt.verify(token,process.env.emailTokenSecret);
        if (!decoded) {
            res.status(400).json({message:"in-valid decoded token"})
        } else {
            const User = await userModel.findById(decoded.id).select('confirmEmail');
            if (!User) {
                res.status(400).json({message:"in-valid account"})
            } else {
                if (User.confirmEmail) {
                    res.status(400).json({message:"already confirmed account"})
                } else {
                    await userModel.findByIdAndUpdate({_id:User._id},{confirmEmail:true},{new:true})                    
                    res.status(200).json({message:"confirmed plz login"})
                    // redirect login html page
                }                
            }            
        }
    
    const User =  userModel.findOne(token);
       await sendEmail(savedUser.email,message)
       res.status(201).json({message:"Done",savedUser})
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}

const   resendToken =async (req , res)=>{
   try {
        const {id} = req.params;
        const user = await userModel.findById(id)
        if (!user) {
            res.status(409).json({message:"in-valid account"})
        } else {
            if (user.confirmEmail) {
                res.status(409).json({message:"already confirmed account"})                   
                
            } else {
                const token = jwt.sign({id:user._id},process.env.emailTokenSecret,{expiresIn:60*2})
                const URL =`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}` 
                const URL2 =`${req.protocol}://${req.headers.host}/api/v1/auth/resendToken/${user._id}` 
                const message = `<a href=${URL}>plz follow me to confirm your email</a>
                <br>
                <a href=${URL2}>refresh token</a>
                `
                await sendEmail(user.email,message)
                res.status(201).json({message:"Done",user})                   
            }
        }
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}


const login =async (req , res)=>{
   try {
       const {password , email } = req.body; 
       const User =await  userModel.findOne({email});
       if (!User) {
           res.status(404).json({message:"in-valid user email"})
        }
        else{
            if (User.isBlocked) {
                res.status(409).json({message:"u account has been blocked by admin"})
                
            } else {
                
                const match = bcrypt.compare(password,User.password)
                if (!match) {
                    res.status(404).json({message:"invalaid account details"})
                } else {
                    const token  =  jwt.sign({ id:User._id , isLoggedIn : true}, process.env.tokenSecret,{expiresIn:'24h'});
                    await userModel.findOneAndUpdate({email},{online:true})
                    res.status(200).json({message:"Done",token})
                }
            }
       }
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}
const logout =async (req , res)=>{
   try {
        await userModel.findOneAndUpdate({_id:req.user._id},{lastSeen:Date.now(),online:false})
        res.status(200).json({message:"Done"})
       
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}

const sendCode =async (req , res)=>{
   try {
       const { email } = req.body; 
       const User =await  userModel.findOne({email});
       if (!User) {
           res.status(404).json({message:"in-valid account"})
        }
        else{
            // to generate random number consist of 4 digits
            const code = Math.floor(Math.random()*(999-1000+1)+1000)
            const message = `<p>
            use the code to update u password : ${code}
            </p>`
            await userModel.findOneAndUpdate(User._id,{code})
            await sendEmail(email,message)
            res.status(200).json({message:"Done"})
        
       }
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}


const   forgetPassword =async (req , res)=>{
   try {
       const { email , code , newPassword } = req.body; 
       const User =await  userModel.findOne({email});
       if (!User) {
           res.status(404).json({message:"in-valid account"})
        }
        else{
            if (User.code.toString() != code.toString()) {
                res.status(409).json({message:"wrong code"})
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRounds))
                await userModel.findOneAndUpdate(User._id,{password : hashedPassword , code : ''})
                res.status(200).json({message:"Done plz login"})
                
            }
         
        
       }
    } catch (error) {
       res.status(500).json({message:"catch error",error})
   }
}


module.exports = {
    signup,
    login,
    confirmEmail ,
    resendToken,
    sendCode   ,
    forgetPassword,
    logout
}