import Patient from "../models/patient.js";
import bcrypt from 'bcrypt';

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
const injectTimestamps = (array, field = 'timestamp') => {
  return Array.isArray(array) ? array.map(entry => ({
    ...entry,
    [field]: entry[field] || new Date()
  })) : array;
};

// Create new patient
export const addPatient = async (req, res) => {
  const {
    fingerPrint, retinaScan, firstName, password, middleName, lastName, dob,
    bloodGroup, gender, address, admission, medications, vitals,
    notes, symptoms, procedures, contact, email, emergencyContact
  } = req.body;

  try {
    const exist = await Patient.findOne({ fingerPrint });
    if (exist) return res.status(400).json({ message: `Patient already exists` });

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
      medications: injectTimestamps(medications, 'start_date'),
      vitals: injectTimestamps(vitals),
      notes: injectTimestamps(notes),
      symptoms,
      procedures,
      contact,
      email,
      emergencyContact
    });

    const saved = await newPatient.save();
    res.status(201).json({ message: 'New patient created', patient: saved });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create New patient', error: err.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients.length) return res.status(404).json({ message: 'No patients found' });
    res.status(200).json({ message: 'Patients fetched successfully', patients });
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch patients', error: err });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findOne({ patientId });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};
export const getPatientByPatientId = async (req, res) => {
  try {
    console.log('called by-patientid from frontend')
    const { patientId } = req.params;
    const patient = await Patient.findOne({ patientId });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin updates all except patientId
export const updatePatientbyAdmin = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    delete updates.patientId;

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    if (updates.medications) updates.medications = injectTimestamps(updates.medications, 'start_date');
    if (updates.vitals) updates.vitals = injectTimestamps(updates.vitals);
    if (updates.notes) updates.notes = injectTimestamps(updates.notes);

    const updatedPatient = await Patient.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// Medical role can only update medical-related fields
export const updatePatientbyMedical = async (req, res) => {
  const { id } = req.params;
  const {
    vitals, medications, notes, symptoms, procedures, admission
  } = req.body;

  try {
    const updateData = {};
    if (vitals) updateData.vitals = injectTimestamps(vitals);
    if (medications) updateData.medications = injectTimestamps(medications, 'start_date');
    if (notes) updateData.notes = injectTimestamps(notes);
    if (symptoms) updateData.symptoms = symptoms;
    if (procedures) updateData.procedures = procedures;
    if (admission) updateData.admission = admission;

    const updated = await Patient.findByIdAndUpdate(id, { $set: updateData }, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json({ message: 'Patient medical details updated successfully', patient: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePatientSelf = async (req, res) => {
  const { id } = req.params;
  const { contact, emergencyContact, address } = req.body;

  // Build update object conditionally
  const updates = {};
  if (contact) updates.contact = contact;
  if (address) updates.address = address;
  if (emergencyContact) updates.emergencyContact = emergencyContact;

  // If no allowed fields provided
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message: 'No valid fields provided for update. You can only update contact, emergencyContact, or address.'
    });
  }

  try {
    const updated = await Patient.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Your profile has been updated successfully',
      patient: updated
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update patient profile',
      error: error.message
    });
  }
};


