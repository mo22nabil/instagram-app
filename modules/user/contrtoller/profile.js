const userModel = require("../../../DB/model/User")
const bcrypt = require('bcryptjs');


const profile = async (req,res)=>{
    try {
        const user = await userModel.findById(req.user._id)
        res.status(200).json({message:"Done",user});
    } catch (error) {
        
        res.status(500).json({message:"catch error",error});
    }

}
// const myprofile = async (req,res)=>{
//     try {
//         const id = req.params;
//         const user = await userModel.findById(req.user._id)
//         res.status(200).json({message:"Done",user});
//     } catch (error) {
        
//         res.status(500).json({message:"catch error",error});
//     }

// }



const profilePic = async (req,res)=>{
    try {
        if(req.fileError){
            res.status(400).json({message:"in-valid file format"});
        }else{
            const imageUrl = `${req.finalDestination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:imageUrl},{new:true})
            res.status(200).json({message:"Done",user});
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error});
    }
}
const covPic = async (req,res)=>{
    try {
        if(req.fileError){
            res.status(400).json({message:"in-valid file format"});
        }else{
            const URL = []
            req.files.forEach(file => {
                URL.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:URL},{new:true})
            res.status(200).json({message:"Done",user});
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error});
    }
}

const updatePassword = async (req,res)=>{
    try {
        const {oldPassword , newPassword} = req.body;

        if(oldPassword == newPassword){
            res.status(400).json({message:"new password can not equal old password"});
        }else{
            const user = await userModel.findById(req.user._id);
            const match = await bcrypt.match(oldPassword , user.password)
            if (!match) {
                res.status(404).json({message:"wrong password"});
            } else {
                
                const hashedPassword = bcrypt.hash(newPassword,parseInt(process.env.saltRounds))
                await userModel.findOneAndUpdate(user._id  ,{password : hashedPassword})
                res.status(200).json({message:"updated new password"});
            }

        }
    } catch (error) {
        res.status(500).json({message:"catch error",error});
    }
}

const QRCode = require('qrcode')
const QR = async (req,res)=>{
    try {
        const user = await userModel.findById(req.user._id).select('userName email ');
        QRCode.toDataURL(`${req.protocol}://${req.headers.host}//api/v1/user/profile`, function (err, url) {
            if (err) {
                res.status(400).json({message:"error",err});
            } else {
                res.status(200).json({message:"Done",url});
            }
          })  
    } catch (error) {
        res.status(500).json({message:"catch error",error});
    }
}



module.exports  = {
    profile,
    profilePic,
    covPic,
    QR,
    updatePassword
}