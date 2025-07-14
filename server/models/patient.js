import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
},{timestamps: true})

const Patient = mongoose.model ('Patient',patientSchema)
export default Patient