const router = require('express').Router();
const { auth} = require('../../middlewear/auth');
const validation = require('../../middlewear/validation');
const controller = require('./contrtoller/profile');
const validators = require('./user.validation');
const endPoint = require('./user.endPoint');
const { myMulter,fileValidator, multerPath, HME } = require('../../service/multer');


//get all users
router.get('/profile',validation(validators.profile) ,auth(endPoint.profile) ,controller.profile );

// //get your profile
// router.get('/profile/:id',controller.myprofile );

router.patch('/profile/pic',validation(validators.profile),auth(endPoint.profile) ,myMulter(multerPath.profilePic,fileValidator.image).single('image')
,HME,validation(validators.profileTwo)  ,controller.profilePic );

router.patch('/profile/cov',
auth(endPoint.profile),myMulter(multerPath.profilePic,
fileValidator.image).array('image', 15),HME
,controller.covPic);

// update password
router.get('/updatePassword',validation(validators.updatePassword) ,auth(endPoint.profile) ,controller.updatePassword );

// Qr code
router.get('/qr',auth(endPoint.profile) ,controller.QR );

module.exports = router ;