const router = require('express').Router()
const controller = require('./controller/registration')
const validator = require('./auth.validation');
const validation = require('../../middlewear/validation');
const { auth } = require('../../middlewear/auth');
const endpoint = require('./auth.endpoint');

//signup
router.post('/signup',validation(validator.signup),controller.signup) 
//confirmEmail
router.get('/confirmEmail/:token',validation(validator.confirmEmail),controller.confirmEmail) 

//resend token
router.get('/resendToken/:id',validation(validator.confirmEmail),controller.resendToken) 


// request code
router.post('/sendCode',validation(validator.sendCode), controller.sendCode) 


// update password
router.patch('/forgetPassword',validation(validator.forgetPassword), controller.forgetPassword) 


// login
router.post('/login',validation(validator.login), controller.login) 

// logout
router.post('/logout',auth(endpoint.logout), controller.logout) 


module.exports = router;