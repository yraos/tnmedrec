const express = require('express')
const router = express.Router()
const Doctor = require('../models/doctor')
const bcrypt = require("bcrypt")
process.env.SECRET_KEY = 'secret'
//all Doctors
//router.get('/', async (req, res) => {
//    res.send('Login Panel')
//})

//render doctor reg
router.get('/', async (req, res) => {
    res.render('login/login',{doctor: doctor})
})
//create doctor
router.post('/', (req, res) => {
    Doctor.findOne({
        email: req.body.email
    })
    .then(doctor =>{
        if(doctor){
            if(req.body.password== doctor.password){
                const payload =  {
                    _id: doctor._id,
                    first_name:doctor.first_name,
                    last_name:doctor.last_name,
                    email:doctor.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }else {
                res.render('login/login',{
                    doctor: doctor,
                    errorMessage:'password incorrect'})
                
            }
        }else{
            res.render('login/login',{
                errorMessage:'no account with such email'})
        }
    })
    .catch(err =>{
        res.send('error: '+ err     )
    })


})


module.exports = router