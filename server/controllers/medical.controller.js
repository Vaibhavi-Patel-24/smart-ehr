import mongoose from "mongoose";
import Medical from "../models/medical.js";
import bcrypt from 'bcrypt';

const generateMedicalId = () => {
  const prefix = "MED";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
};

const generateUniqueMedicalId = async () => {
  let unique = false;
  let newId = "";
  while (!unique) {
    newId = generateMedicalId();
    const existing = await Medical.findOne({ medicalId: newId });
    if (!existing) unique = true;
  }
  return newId;
};


export const createMedical = async (req, res) => {
  const { name, branchName, address, contact, email, password, hospitalId } = req.body;

  try {
    
     const exists = await Medical.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Medical already exists' });
    }

    const medicalId = await generateUniqueMedicalId();

    console.log("medicalId:",medicalId)

   
    // 🔐 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newMedical = new Medical({
      medicalId,
      hospitalId: new mongoose.Types.ObjectId(hospitalId), // 👈 convert string to ObjectId
      name,
      branchName,
      address,
      contact,
      email,
      password: hashedPassword, // 🔐 store hashed password
    });

    const saved = await newMedical.save();

    res.status(201).json({ message: 'New medical created', medical: saved });
  } catch (err) {
    res.status(400).json({ message: 'Creation failed', error: err.message });
  }
};

export const getAllMedicals = async (req, res) => {
  try {
    const medicals = await Medical.find();
    res.status(200).json(medicals);
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};


export const getMedicalById = async (req, res) => {
  try {
    const { medicalId } = req.params; // ✅ correctly get named param
    const medical = await Medical.findOne({ medicalId }); // ✅ pass as filter object

    if (!medical) return res.status(404).json({ message: 'Medical not found' });

    res.status(200).json({ medical }); // ✅ return wrapped in an object for frontend
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const deleteMedical = async (req, res) => {
  try {

    const medical = await Medical.findOneAndDelete({ medicalId: req.params.id });
    if (!medical) return res.status(404).json({ message: 'Medical not found' });

    res.status(200).json({ message: 'Medical deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};

export const updateMedical = async (req, res) => {
  const { id } = req.params;
  const { medicalId, name, branchName, address, contact, email, password } = req.body;

  try {
    const updated = await Medical.findByIdAndUpdate(
      id,
      { medicalId, name, branchName, address, contact, email, password },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Medical not found' });
    }

    res.status(200).json({ message: 'Medical updated successfully', medical: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};


export const updateMedicalByAdmin = async (req, res) => {
  const { medicalId } = req.params;
  const updates = { ...req.body };

  try {
    // Prevent changing medicalId
    delete updates.medicalId;

    // If password is being updated, hash it
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updated = await Medical.findOneAndUpdate(
      { medicalId },               // 🔍 filter by custom ID
      { $set: updates },           // ⚙️ only update provided fields
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Medical not found" });
    }

    res.status(200).json({
      message: "Medical updated successfully",
      medical: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};