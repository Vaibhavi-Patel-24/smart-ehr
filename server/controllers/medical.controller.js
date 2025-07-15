import Medical from "../models/medical.js";
import bcrypt from 'bcrypt';


export const createMedical = async (req, res) => {
  const { name, branchName, address, contact, email, password } = req.body;

  try {
    
     const exists = await Medical.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Medical already exists' });
    }

    const lastMedical = await Medical.find().sort({ medicalId: -1 }).limit(1);
    const medicalId = lastMedical.length > 0
    ? lastMedical[0].medicalId + 1
    : 1;

    console.log("medicalId:",medicalId)

   
    // 🔐 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newMedical = new Medical({
      medicalId,
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
    const medical = await Medical.findById(req.params.id);
    if (!medical) return res.status(404).json({ message: 'Medical not found' });

    res.status(200).json(medical);
  } catch (error) {
    res.status(400).json({ message: 'Server error', error: error.message });
  }
};


export const deleteMedical = async (req, res) => {
  try {
    const medical = await Medical.findByIdAndDelete(req.params.id);
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

