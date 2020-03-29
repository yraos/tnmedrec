const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const Consultation = require('../models/consultation')
//all  Patients
router.get('/', async (req, res) => {
   let query = Patient.find()
   if(req.query.email != null && req.query.email !== ''){
    query=query.regex('email',new RegExp(req.query.email,'i'))
    }
    try{
       const patient= await query.exec()
       res.render('patients/index',{
           patient:patient,loginOptions:req.query})
   }catch{
       res.redirect('/')
   }
})

//new patient route
router.get('/register', async (req, res) => {
    try{
        const patient = new Patient()
        res.render('patients/new',{patient:patient}) 
    }catch{
        res.redirect('/patients')
    }
})
//create patient
router.post('/', async (req, res) => {
    const today = new Date()
    const patient = new Patient({
        cin:req.body.cin,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone_number:req.body.phone_number,
        address:req.body.address,
        created: today,
        emergencycontact:{
            first_name:req.body.efirst_name,
            last_name:req.body.elast_name,
            phone_number:req.body.ephone_number,
            work_number:req.body.ework_number,
            address:req.body.eaddress,
        },medhistory:{
            active_problems:req.body.active_problems,
            current_medication:req.body.current_medication,
            vaccines_list:req.body.vaccines_list,
            allergies:req.body.allergies,
            blood_type:req.body.blood_type,
            surgeries:req.body.surgeries,
        }
    })
    try{
        const newpatient = await patient.save()
        res.redirect(`patients/${patient.id}`)
    }catch{
        res.redirect(`patients`)
    }

})
router.get('/:id', async (req,res)=>{
    try{
        const patient = await Patient.findById(req.params.id)
                                      .populate()
                                      .exec()
        res.render('patients/show',{patient:patient})

    }catch{
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req,res)=>{
    try{
        const patient = await Patient.findById(req.params.id)
        res.render('patients/edit',{patient:patient})
    }catch{
        res.redirect('patients')
    }
})
router.put('/:id',async (req,res)=>{
    let patient
    try{
        patient = await Patient.findById(req.params.id)
        patient.cin=req.body.cin,
        patient.first_name=req.body.first_name,
        patient.last_name=req.body.last_name,
        patient.email=req.body.email,
        patient.phone_number=req.body.phone_number,
        patient.address=req.body.address,
        patient.emergencycontact={
            first_name:req.body.efirst_name,
            last_name:req.body.elast_name,
            phone_number:req.body.ephone_number,
            work_number:req.body.ework_number,
            address:req.body.eaddress,
        },patient.medhistory={
            active_problems:req.body.active_problems,
            current_medication:req.body.current_medication,
            vaccines_list:req.body.vaccines_list,
            allergies:req.body.allergies,
            blood_type:req.body.blood_type,
            surgeries:req.body.surgeries,
        }
        await patient.save()
        res.redirect(`/patients/${patient.id}`)
    }catch{
        if(patient == null){
            res.redirect('/')
        }else{
        res.redirect(`patients/edit`,{
            patient:patient,
            errorMessage:'Error Updating Patient'
        })}
    }

})
router.get('/:id/consultation',async(req,res)=>{
    const patient = Patient.findById(req.params.id)
                        .populate()
                        .exec()
    let query = Consultation.find(patient.cin)
    try{
       const consultation= await query.exec()
       res.render('patients/consultation',{
        consultation:consultation})
   }catch{
       res.redirect('/')
   }
})

module.exports = router