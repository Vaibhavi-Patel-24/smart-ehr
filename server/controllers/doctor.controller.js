import mongoose from 'mongoose';
import Doctor from '../models/doctor.js';
import nodemailer from 'nodemailer';

// Generate unique doctorId
const generateDoctorId = () => {
  const prefix = "DOC";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
};

const generateUniqueDoctorId = async () => {
  let unique = false;
  let newId = "";
  while (!unique) {
    newId = generateDoctorId();
    const existing = await Doctor.findOne({ doctorId: newId });
    if (!existing) unique = true;
  }
  return newId;
};

// Create Doctor
export const createDoctor = async (req, res) => {
  const { name, specialization, contact, hospitalId } = req.body;

  try {
    const doctorId = await generateUniqueDoctorId();

    const newDoctor = new Doctor({
      doctorId,
      name,
      specialization,
      contact,
      hospitalId: new mongoose.Types.ObjectId(hospitalId),
    });

    const saved = await newDoctor.save();
    res.status(201).json({ message: 'Doctor created successfully', doctor: saved });
  } catch (error) {
    res.status(400).json({ message: 'Doctor creation failed', error: error.message });
  }
};

// Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('hospitalId');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// Get doctors by hospitalId and specialization
// export const getDoctorsByHospitalAndSpecialization = async (req, res) => {
//   const { hospitalId, specialization } = req.query;
//   console.log(req.query)
//   console.log(hospitalId)
//   console.log(specialization)
//   try {
//     console.log('fetching the doctor')
//     const doctors = await Doctor.find({
//       hospitalId,
//       specialization 
//     });
//     console.log(doctors)
//     console.log(`doctor found ${doctors}`)
//     res.status(200).json(doctors);
//   } catch (error) {
//     console.log('doctor not found')
//     res.status(500).json({ message: 'Error fetching doctors', error: error.message });
//   }
// };

export const getDoctorsByHospitalAndSpecialization = async (req, res) => {
 const { hospitalId, specialization } = req.params; 
    // console.log(hospitalId)
    // console.log(specialization)
 try {
     const doctors = await Doctor.find({
     hospitalId,
     specialization: specialization 
    });
    // console.log(doctors)
     res.status(200).json(doctors);
 } catch (error) {
     res.status(500).json({ message: 'Error fetching doctors', error: error.message });
 }
};

// Get Doctor by doctorId
export const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};

// Update Doctor
export const updateDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const updates = { ...req.body };

  try {
    // Prevent doctorId from being updated
    delete updates.doctorId;

    const updated = await Doctor.findOneAndUpdate(
      { doctorId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ message: 'Doctor updated successfully', doctor: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const deleted = await Doctor.findOneAndDelete({ doctorId });
    if (!deleted) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting doctor', error: error.message });
  }
};
