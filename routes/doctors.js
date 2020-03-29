const express = require('express')
const router = express.Router()
const Doctor = require('../models/doctor')
const bcrypt = require("bcrypt")
process.env.SECRET_KEY = 'secret'
//all Doctors
router.get('/', async (req, res) => {
    let loginOptions = {}
    if(req.query.email != null && req.query.email !== ''){
        loginOptions.email = new RegExp(req.query.email,'i')
    }
    try{
        const doctors = await Doctor.find(loginOptions)
        //res.render(loginOptions)
        res.render('doctors/index',{doctors:doctors , loginOptions})
    }catch{
        res.redirect('/')
    }
})

//render doctor reg
router.get('/register', async (req, res) => {
    res.render('doctors/new',{doctor: new Doctor})
})
//create doctor
router.post('/', async (req, res) => {
    const today = new Date()
    const doctor = new Doctor({
        cin:req.body.cin,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        speciality:req.body.speciality,
        phone_number:req.body.phone_number,
        address:req.body.address,
        created: today
    })

            try{
                const newDoctor =  await doctor.save()
                res.redirect('doctors')
            }catch{
                res.render('doctors/new',{
                doctor: doctor,
                errorMessage:'Error creating Doctor'
            })
        }
    })


module.exports = router