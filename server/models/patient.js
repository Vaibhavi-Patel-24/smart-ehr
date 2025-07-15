import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
  patientId:       { type: String, required: true, unique:true },
  fingerPrint:     { type: String, required: true },
  retinaScan:      { type: String, required: true },
  firstName:       { type: String, required: true },
  middleName:      { type: String, required: true },
  lastName:        { type: String, required: true },
  password:        { type: String, required: true },
  dob:             { type: Date, required: true },
  bloodGroup:      { type: String, required: true },
  gender:          { type: String, required: true },
  address:         { type: String, required: true },
  admission: {
    admission_id:  { type: String, required: true },
    admission_time:{ type: Date, required: true },
    location:      { type: String, required: true },
    reason:        { type: String, required: true }
  },
  medications: [
  {
    name:        { type: String, required: true },
    dose:        { type: String, required: true },
    frequency:   { type: String, required: true },
    start_date:  { type: Date, required: true },
    end_date:    { type: Date, default: null }
  }
],
  vitals: [
    {
      type:        { type: String },
      value:       { type: mongoose.Schema.Types.Mixed }, // allow number or string (e.g., BP)
      timestamp:   { type: Date }
    }
  ],
  notes: {
  type: [
    {
      author: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        required: true
      },
      content: {
        type: String
        // optional, only include if note content exists in full data
      }
    }
  ],
  default: []
},
  symptoms:        { type: [String], required: true },
  procedures:      { type: [String], default: [] },
  contact:         { type: String, required: true },
  email:           { type: String, required: true },
  emergencyContact:{ type: [String], required: true }
}, { timestamps: true });


const Patient = mongoose.model ('Patient',patientSchema)
export default Patient