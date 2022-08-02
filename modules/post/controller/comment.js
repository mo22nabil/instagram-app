const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");


const createComment  =async (req,res)=>{
    try {
        const {id} = req.params ;
        const {text} = req.body;
        const post = await postModel.findById(id);
        if (!post) {
            res.status(404).json({message:"in-valid post"})
        }else{
            const newComment = new commentModel({text: text , postId: post._id , createdBy:req.user._id})
            const savedComment = await newComment.save();
            const savedPost = await postModel.findByIdAndUpdate(post._id,{$push:{Comments : savedComment._id}} , {new:true})
            res.status(200).json({message:"Done",savedPost})  
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}


const replayComment  =async (req,res)=>{
    try {
        const {id , commentID} = req.params ;
        const {text} = req.body;
        const post = await postModel.findById(id)
        if (!post) {
            res.status(404).json({message:"in-valid post"})
        }else{
            const comment = await commentModel.findOne({postId: post._id , _id: commentID})
            console.log(comment);
            if (!comment) {
                res.status(404).json({message:"in-valid commnet"})
            } else {
                const newComment = new commentModel({text: text , postId: id , createdBy : req.user._id})
                const savedComment = await newComment.save();
                await commentModel.findByIdAndUpdate(comment._id , {$push:{replay: savedComment._id }})
                res.status(201).json({message:"Done"}) 
            }
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}




module.exports = {
    replayComment,
    createComment
}