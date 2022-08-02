

const joi = require('joi');

const createPost = {
    body : joi.object().required().keys({
        text:joi.string().optional()
    }),
    query : joi.object().required().keys({
        id:joi.string().min(24).max(24).optional()
    })
}
const likePost = {
    params : joi.object().required().keys({
        id:joi.string().min(24).max(24)
    })
}
const createComment = {
    body : joi.object().required().keys({
        text:joi.string().optional()
    }),
    params:joi.object().required().keys({
        id:joi.string().min(24).max(24)
    })
}

const replayComment = {
    body : joi.object().required().keys({
        text:joi.string().optional()
    }),
    params:joi.object().required().keys({
        id:joi.string().min(24).max(24),
        commentID:joi.string().min(24).max(24)
    })
}

module.exports = {
    createPost,
    likePost,
    createComment,
    replayComment
}