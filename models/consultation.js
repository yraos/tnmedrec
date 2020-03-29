const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ConsultationSchema = new Schema({
    patient_cin:{
        type: Number, required: true
    },doctor_cin:{
        type: Number, required: true
    },symptoms:{
        type: String, required: true
    },overview:{
        type: String , required: true
    },medication:{
        type:String , required: true
    },notes:{
        type:String,required: true
    },visit:{
        type:Date,required: true
    }
})


module.exports = consultation = mongoose.model('Consultation', ConsultationSchema)
