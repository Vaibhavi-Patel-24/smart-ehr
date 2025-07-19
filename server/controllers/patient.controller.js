import Patient from "../models/patient.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer'; 

// Configure nodemailer (for Gmail example)

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',   // ✅ Brevo SMTP server
      port: 587,
      secure: false,
      auth: {
        user: '92756b001@smtp-brevo.com', // ✅ Your Brevo SMTP login
        pass: 'MhDnGRBfvTry8xF2',         // ✅ Your Brevo SMTP password
      },
    });

    const mailOptions = {
      from: 'vaibhavipatel9424@gmail.com',  // Friendly name
      to: email,
      subject: 'Your OTP Code is here',
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};



// Helper to generate unique patient ID
const generatePatientId = () => {
  const prefix = "PAT";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
};

const generateUniquePatientId = async () => {
  let unique = false;
  let newId = "";
  while (!unique) {
    newId = generatePatientId();
    const existing = await Patient.findOne({ patientId: newId });
    if (!existing) unique = true;
  }
  return newId;
};

// Add system timestamps to nested fields if missing
const injectTimestamps = (array, field = "timestamp") => {
  return Array.isArray(array)
    ? array.map((entry) => ({
        ...entry,
        [field]: entry[field] || new Date(),
      }))
    : array;
};

// Create new patient
export const addPatient = async (req, res) => {
  const {
    fingerPrint,
    retinaScan,
    firstName,
    password,
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
    emergencyContact,
  } = req.body;

  try {
    const exist = await Patient.findOne({ fingerPrint });
    if (exist)
      return res.status(400).json({ message: `Patient already exists` });

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
      medications: injectTimestamps(medications, "start_date"),
      vitals: injectTimestamps(vitals),
      notes: injectTimestamps(notes),
      symptoms,
      procedures,
      contact,
      email,
      emergencyContact,
    });

    const saved = await newPatient.save();
    res.status(201).json({ message: "New patient created", patient: saved });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create New patient", error: err.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients.length)
      return res.status(404).json({ message: "No patients found" });
    res
      .status(200)
      .json({ message: "Patients fetched successfully", patients });
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch patients", error: err });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params; // ✅ correctly get param
    const patient = await Patient.findOne({ patientId }); // ✅ search by patientId field

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient }); // ✅ wrap in object
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPatientByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log(`called by-patientid from frontend ${patientId}`);
    const patient = await Patient.findOne({ patientId });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin updates all except patientId
export const updatePatientbyAdmin = async (req, res) => {
 const { patientId } = req.params;
  const updates = { ...req.body };

  try {
    delete updates.patientId;

    // if (updates.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   updates.password = await bcrypt.hash(updates.password, salt);
    // }

    const updated = await Patient.findOneAndUpdate(
      { patientId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};




// Medical role can only update medical-related fields
export const updatePatientbyMedical = async (req, res) => {
  const { patientId } = req.params;
  // not id
  const { vitals, medications, notes, symptoms, procedures, admission } =
    req.body;
    console.log('Updating patient with patientId:', patientId);

  try {
    const updateData = {};
    if (vitals) updateData.vitals = injectTimestamps(vitals);
    if (medications)
      updateData.medications = injectTimestamps(medications, "start_date");
    if (notes) updateData.notes = injectTimestamps(notes);
    if (symptoms) updateData.symptoms = symptoms;
    if (procedures) updateData.procedures = procedures;
    if (admission) updateData.admission = admission;

    const updated = await Patient.findOneAndUpdate(
      { patientId: patientId }, // match by custom field
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Patient not found" });

    res
      .status(200)
      .json({
        message: "Patient medical details updated successfully",
        patient: updated,
      });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePatientSelf = async (req, res) => {
  const { patientId } = req.params;
  console.log(`called updatepatientbyself: ${patientId}`)
  const { contact, emergencyContact, address, email } = req.body;

  console.log(contact)
  console.log(emergencyContact)
  console.log(address)
  console.log(email)
  // Build update object conditionally
  const updates = {};
  if (contact) updates.contact = contact;
  if (address) updates.address = address;
if (email) updates.email = email;
  if (emergencyContact) updates.emergencyContact = emergencyContact;
  console.log(updates)
  // If no allowed fields provided
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message:
        "No valid fields provided for update. You can only update contact, emergencyContact, or address.",
    });
  }

  try {
    console.log('trying to findandupdate')
    const updated = await Patient.findOneAndUpdate(
      { patientId: patientId }, // match by custom field
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Your profile has been updated successfully",
      patient: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update patient profile",
      error: error.message,
    });
  }
};

export const deletePatient = async (req, res) => {
  try {

    const patient = await Patient.findOneAndDelete({ patientId: req.params.id });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};



// POST /patients/send-otp
export const sendPatientOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    patient.otp = otp;
    patient.otpExpiry = expiry;
    await patient.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendPatientOTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// POST /patients/verify-otp
export const verifyPatientOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await Patient.findOne({ email });

    if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });
    if (user.otp !== otp || Date.now() > user.otpExpiry)
      return res.status(400).json({ isSuccess: false, message: "Invalid or expired OTP" });

    // ✅ Step 3: If newPassword is provided, update it
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(200).json({ isSuccess: true, message: "Password reset successful" });
    }

    // ✅ Step 2: OTP is valid, but password not yet provided
    return res.status(200).json({ isSuccess: true, message: "OTP verified" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, message: "Server error" });
  }
};



