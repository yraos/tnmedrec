const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PatientSchema = new Schema({
    cin:{
        type: Number, required: true
    },
    first_name:{
        type: String, required: true
    },last_name:{
        type: String, required: true
    },email:{
        type: String, required: true
    },phone_number:{
        type: Number , required: true
    },address:{
        type:String , required: true
    },date:{
        type:Date,
        default:Date.now
    },emergencycontact:{
        first_name:{
            type: String, required: true
        },last_name:{
            type: String, required: true
        },phone_number:{
            type: Number , required: true
        },work_number:{
            type: Number , required: true
        },address:{
            type:String , required: true
        }
    },medhistory:{
        active_problems:{
            type: String , required: true
        },current_medication:{
            type: String, required: true
        },vaccines_list:{
            type: String , required: true
        },allergies:{
            type: String , required: true
        },blood_type:{
            type:String , required: true
        },surgeries:{
            type:String,required: true
        }
    }
})

module.exports = Patient = mongoose.model('patient',PatientSchema)