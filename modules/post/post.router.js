const router = require('express').Router()
const { auth } = require('../../middlewear/auth')
const validation = require('../../middlewear/validation')
const postcontroller = require('./controller/post')
const commentController = require('./controller/comment')
const endpoint = require('./post.endPoint')
const validators = require('./post.validation')
const { myMulter, multerPath, fileValidator, HME } = require('../../service/multer')


router.get('/',postcontroller.postList)


// create post
router.post('/' , auth(endpoint.createPost),
myMulter(multerPath.profilePic  ,fileValidator.image).array('image',15),
HME,
validation(validators.createPost) , postcontroller.createPost)

// like post
router.patch('/:id/like',validation(validators.likePost),auth(endpoint.createPost),postcontroller.likePost)


// unlike post
router.patch('/:id/unlike',validation(validators.likePost),auth(endpoint.createPost),postcontroller.unlikePost)


//create comment
router.post('/:id/comment',validation(validators.createComment),auth(endpoint.createPost),commentController.createComment)


//create replay comment
router.patch('/:id/comment/:commentID',validation(validators.replayComment),auth(endpoint.createPost),commentController.replayComment)

module.exports = router