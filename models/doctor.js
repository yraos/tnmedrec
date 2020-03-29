const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DoctorSchema = new Schema({
    cin:{
        type: Number, required: true
    },
    first_name:{
        type: String, required: true
    },last_name:{
        type: String, required: true
    },email:{
        type: String, required: true
    },password:{
        type: String, required: true
    },speciality:{
        type:String , required: true
    },phone_number:{
        type: Number , required: true
    },address:{
        type:String , required: true
    },date:{
        type:Date,
        default:Date.now
    }
})


module.exports = doctor = mongoose.model('Doctor', DoctorSchema)
