import mongoose from "mongoose";

const medicalSchema = mongoose.Schema({
    medicalId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    brachName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps: true});

const Medical = mongoose.model('Medical',medicalSchema);
export default Medical
