import Patient from "../models/patient.js"
import bcrypt from 'bcrypt'

// Helper to generate unique patient ID
const generatePatientId = () => {
  const prefix = "PAT";
  const timestamp = Date.now().toString().slice(-6); // last 6 digits
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `${prefix}${timestamp}${random}`;
};

// Ensure uniqueness by checking DB
const generateUniquePatientId = async () => {
  let unique = false;
  let newId = "";

  while (!unique) {
    newId = generatePatientId();
    const existing = await Patient.findOne({ patientId: newId });
    if (!existing) {
      unique = true;
    }
  }

  return newId;
};


export const addPatient = async (req,res) => {
    const {fingerPrint,retinaScan,firstName,password,middleName,lastName,dob,bloodGroup,gender,address,admission,medications,vitals,notes,symptoms,procedures,contact,email,emergencyContact} = req.body
    try{
        const exist = await Patient.findOne({fingerPrint})
        if(exist){
            res.status(400).json({message:`Patient already exists`})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const patientId = await generateUniquePatientId();

        const newPatient = new Patient({
            patientId,
            fingerPrint,
            retinaScan,
            firstName,
            password: hashedPassword,
            middleName,
            lastName,
            dob,
            bloodGroup,
            gender,
            address,
            admission,
            medications,
            vitals,
            notes,
            symptoms,
            procedures,
            contact,
            email,
            emergencyContact
        })
        
        const saved = await newPatient.save()
    res.status(201).json({ message: 'New patient created', patient: saved });
}catch(err){
        res.status(400).json({ message: 'Failed to create New patient', error:err.message });
    }
};

export const getAllPatients = async (req,res) =>{
    try{
        const patients = await Patient.find();
        if(patients) res.status(200).json({message:`patients exists and fetched all patients`, patients:patients})
         else res.status(404).json({message:`patients does not exists or patients not found`})
             
    }catch(err){
        res.status(400).json({message:`failed to fetch patients`,error:err})
    }
}