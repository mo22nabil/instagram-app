const userModel = require("../../../DB/model/User");
const sendEmail = require("../../../service/sendEmail");



const getAllUsers  =async (req ,res )=>{
    const users = await userModel.find({$nin :[{role : ['Admin']},{role : ['admin']}]});
    res.status(200).json({mesaage:"Done",users})
}

const changeRole  =async (req ,res )=>{
    const {id} = req.params;
    const {role} = req.params;
    const user = await userModel.findOneAndUpdate({_id : id} , {role});
    sendEmail(user.email , `<h1>admin change u role to Hr</h1>`)
    res.status(200).json({mesaage:"Done"})
}


const blockUser  =async (req ,res )=>{
    const {id} = req.params;
    const user = await userModel.findOneAndUpdate({_id : id , role : {$nin :['Admin']}} , {isBlocked : true});
    sendEmail(user.email , `<h1>admin block your account </h1>`)
    res.status(200).json({mesaage:"Done"})
}

module.exports = {
    getAllUsers,
    blockUser,
    changeRole
}