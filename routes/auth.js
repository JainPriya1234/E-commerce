const express = require('express');
const router = express.Router();
const messagecontroller = require('../controllers/user.controllers');
const { check, validationResult } = require('express-validator');
//const {verifytoken} = require('../controllers/user.controllers');

router.post('/signup',
    check('email')
        .isEmail()
        .withMessage("please enter valid email"),
    check('password').isLength(min = 3, max = 6)
        .withMessage("please enter password of range 3 to 6 characters"),
    check('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password should match');
        }
        return true;
    }),
    messagecontroller.signup);
router.post('/otpverify', messagecontroller.otpverify);
//router.post('/sendotp', messagecontroller.otpsend);
router.post('/forgetpassword', messagecontroller.forgetpassword);
router.post('/resetpassword', messagecontroller.resetpassword);
router.post('/updatepassword', messagecontroller.updatepassword);
router.post('/login', messagecontroller.login);
//router.post('/profile', verifytoken , messagecontroller.profile);

module.exports = router;