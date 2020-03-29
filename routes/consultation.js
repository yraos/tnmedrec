const express = require('express')
const router = express.Router()
const Consultation = require('../models/consultation')
//all Doctors
router.get('/', async (req, res) => {
    res.send('All Conultations')
})

//render doctor reg
router.get('/col', async (req, res) => {
    res.render('consultations/new',{consultations: new Consultation})
})
//create doctor
router.post('/', async (req, res) => {
    const today = new Date()
    const consultations = new Consultation({
        patient_cin:req.body.patient_cin,
        doctor_cin:req.body.doctor_cin,
        symptoms:req.body.symptoms,
        overview:req.body.overview,
        medication:req.body.medication,
        notes:req.body.notes,
        visit: today
    })
            try{
                const newconsultation = await consultations.save()
                res.redirect(`consultation`)
            }catch{
                res.redirect(`consultation`)
        }
    })


module.exports = router