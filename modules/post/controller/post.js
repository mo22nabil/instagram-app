const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");
const userModel = require("../../../DB/model/User");
const { paginate } = require("../../../service/paginate");
const { getIo } = require("../../../service/socket");
const select = "userName  email"
const PS =[
    {
        path : "createdBy",
        select 
    },
    {
        path : "likes",
        select 
    },
    {
        path : "Comments",
        match : {isDeleted : false},
        populate :[
            {
                path : "createdBy",
                select 
            },
            {
                path : "replay",
                populate : [
                        {
                            path : "createdBy",
                            select 
                        }, {
                            path : "replay",
                            populate  : [
                                {
                                    path : "createdBy",
                                    select 
                                }
                            ]
                        }
                    ]
            },

        ]
    },
]

const createPost  =async (req,res)=>{
    try {
        const {text} = req.body ;
        if (req.fileErr) {
            res.status(404).json({message:"in-valiad file format"})
        }else{
            const imageURL = []
            req.files.forEach(file => {
                imageURL.push(`${req.finalDestination}/${file.filename}`)
            });
            const newPost = new postModel({text ,image :imageURL , createdBy:req.user._id})
            const savedPost = await newPost.save()
            const socketUser = await userModel.findById(req.query.id).select('socketID')
            getIo().except(socketUser.socketID).emit('replay',[newPost])
            res.status(201).json({message:"Done",savedPost}) 
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}

const postList  =async (req,res)=>{
    try {
        const {page , size} = req.query;
        const {skip ,limit } = paginate(page ,size);
        const post =await postModel.find({}).skip(skip).limit(limit).populate(PS)
        res.status(200).json({message:"Done",post}) 
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}



const likePost  =async (req,res)=>{
    try {
        const {id} = req.params ;
        const post = await postModel.findById(id);
        if (!post) {
            res.status(404).json({message:"in-valiad post id"})
        }else{
            await postModel.findOneAndUpdate(post._id , {$push:{likes:req.user._id}} )
            res.status(200).json({message:"Done"}) 
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}


const unlikePost  =async (req,res)=>{
    try {
        const {id} = req.params ;
        const post = await postModel.findById(id);
        if (!post) {
            res.status(404).json({message:"in-valiad post id"})
        }else{
            await postModel.findOneAndUpdate(post._id , {$pull:{likes:req.user._id}} )
            res.status(200).json({message:"Done"}) 
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error}) 
    }
}
module.exports = {
    createPost,
    likePost,
    unlikePost,
    postList
}