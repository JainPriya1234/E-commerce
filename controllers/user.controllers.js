const userschemma = require('../models/userschemma');
const otpschema = require('../models/otpschema');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const api_key = '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';
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = "secretkey";

exports.signup = async (req, res, next) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedpassword = await bcrypt.hash(password, 10);
        const exist = await userschemma.findOne({
            email: email,
            isverified: true
        });
        if (exist) {
            return res.json("already exist..please login");
        }
        //console.log(exist);
        const unverifieduser = await userschemma.findOne({
            email: email
        })
        if (!unverifieduser) {                                                       //new user
            await userschemma.create({
                name: name,
                email: email,
                password: hashedpassword
            })
        }
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });   //send otp to both
        sendMail(email, OTP);
        const otpexist = await otpschema.findOne({ email: email })
        if (!otpexist) {
            await otpschema.create({
                email: email,
                otp: OTP
            })
        }
        else {
            await otpschema.findOneAndUpdate({ email: email }, { otp: OTP })
        }
        res.json("successfully signed up! please verify otp");
    }
    catch (err) {
        res.json(err)
    }
}

function sendMail(email, msg) {
    console.log("sending email! ");
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: api_key
        }
    }))

    transporter.sendMail({
        from: "priya.jain11302@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: msg, // plain text body
        html: msg, // html body
    });
    console.log("sent!");
};

exports.otpverify = async (req, res, next) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const exist = await otpschema.findOne({
            email: email
        })

        if (exist) {

            if (exist.otp == otp) {
                await userschemma.findOneAndUpdate({ email: email }, { isverified: true })
                return res.json("otp verified !!!");
            }
            else {
                return res.json("wrong otp");
            }
        }
        res.json("No user Found")
    }
    catch (error) {
        res.json(error);
    }
}
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const isexist = await userschemma.findOne({
        email: email
    })
    if (isexist) {
        if (isexist.isverified) {
            const comp = await bcrypt.compare(password, isexist.password);
            if (comp) {
                //  jwt.sign({ isexist}, secretkey, {expiresIn: '300s'},(err,token)=> {
                //     console.log(token);
                // })
                res.json("login successfully");
            }
            else {
                res.json("wrong password");
            }
        }
        else {
            res.json("user not verified! ");
        }
    }
    else {
        res.json("user not exist");
    }
}
// function verifytoken(req,res,next){
//      const bearerHeader = req.headers['authorization'];
//      if(typeof bearerHeader !== "undefined"){

//      }
//      else{
//         res.json("token is not valid");
//      }
// }
// exports.profile =async(req,res) => {
//      try{
//         res.json("hi");
//      }catch(err){
//         res.json(err);
//      }
// }
exports.forgetpassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const exist = await userschemma.findOne({
            email: email
        });
        const resetotp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        console.log(resetotp);
        if (exist) {
            sendMail(email, resetotp);
            await otpschema.findOneAndUpdate({ email: email }, { otp: resetotp });
            res.json("check your email and reset the password! ");
        }
        else {
            res.json("email doesn't exist! ");
        }
    }
    catch (error) {
        res.send(Error);
    }
}
exports.otpsend = async (req, res, next) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const exist = await userschemma.findOne({
        email: email
    });
    try {
        if (exist) {
            if (otp == otpverify) {
                res.json("valid otp! ")
            }
            else {
                res.json("invalid otp! ")
            }
            res.json("exist email")
        }
        else {
            res.json(error = "this user doen't exist !")
        }
    } catch (error) {
        res.json(Error)
    }


}

exports.resetpassword = async (req, res, next) => {

    try {
        const email = req.body.email;
        const newpassword = req.body.newpassword;
        const otp = req.body.otp;
        const hashpassword = await bcrypt.hash(newpassword, 10);
        const exist = await otpschema.findOne({
            email: email
        })

        if (exist) {

            if (exist.otp == otp) {
                // await userschemma.findOneAndUpdate({ email: email }, {password: newpassword });
                await userschemma.findOneAndUpdate({ email: email }, { password: hashpassword });

                res.json("otp verified and password updated");
            }
            else {
                res.json("wrong otp");
            }
        }

    }
    catch (error) {
        res.send(error);
    }
}

exports.updatepassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const oldpassword = req.body.oldpassword;
        const newpassword = req.body.newpassword;
        const hashpassword = await bcrypt.hash(newpassword, 10);
        const exist = await userschemma.findOne({ email: email });
        if (exist) {
            const compo = await bcrypt.compare(oldpassword, exist.password);
            if (compo) {
                await userschemma.findOneAndUpdate({ email: email }, { password: hashpassword });

                res.json("password updated");
            }
        }
        else {
            res.json("no user found!");
        }
    }
    catch (err) {
        res.json(err);
    }
}

//module.exports = {verifytoken};