import mongoose from 'mongoose'
const doctorSchema = mongoose.Schema({
    doctorId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        reuired:true,
        validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Only 10-digit numbers
        },
        message: props => `${props.value} is not a valid 10-digit contact number!`
        }
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital", // This assumes you have a separate Hospital model
        required: true
      }
})

const Doctor = mongoose.model('Doctor',doctorSchema)

export default Doctor;