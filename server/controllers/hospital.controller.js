import Hospital from '../models/hospital.js';

// Generate custom Hospital ID
const generateHospitalId = () => {
  const prefix = "HSP";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
};

const generateUniqueHospitalId = async () => {
  let unique = false;
  let newId = '';
  while (!unique) {
    newId = generateHospitalId();
    const exists = await Hospital.findOne({ hospitalId: newId });
    if (!exists) unique = true;
  }
  return newId;
};

// 📍 Create a new hospital
export const createHospital = async (req, res) => {
  const { name, address, contact, email, location } = req.body;
  console.log(`createHospital: ${name}`)

  try {
    const exists = await Hospital.findOne({ location });
    if (exists) {
      console.log("Hospital already exists");
      return res.status(400).json({ message: "Hospital already exists" });
    }

    const hospitalId = await generateUniqueHospitalId();
    console.log(`Generated hospitalId: ${hospitalId}`);

    const newHospital = new Hospital({
      hospitalId,
      name,
      location, // already contains { type: "Point", coordinates: [...] }
      address,
      contact,
      email
    });

    console.log(`location: ${JSON.stringify(newHospital.location)}`);
    const saved = await newHospital.save();

    res.status(201).json({ message: "Hospital created", hospital: saved });
  } catch (err) {
    console.error("Error creating hospital:", err);
    res.status(400).json({ message: "Creation failed", error: err.message });
  }
};

// 📄 Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(400).json({ message: "Fetch failed", error: err.message });
  }
};

// 🔍 Get hospital by hospitalId
export const getHospitalById = async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const hospital = await Hospital.findOne({ hospitalId });
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({ hospital });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✏️ Update hospital by hospitalId
export const updateHospital = async (req, res) => {
  const { hospitalId } = req.params;
  const updates = { ...req.body };
  delete updates.hospitalId;

  try {
    const updated = await Hospital.findOneAndUpdate(
      { hospitalId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Hospital not found" });

    res.status(200).json({ message: "Hospital updated", hospital: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// ❌ Delete hospital by hospitalId
export const deleteHospital = async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const deleted = await Hospital.findOneAndDelete({ hospitalId });
    if (!deleted) return res.status(404).json({ message: "Hospital not found" });

    res.status(200).json({ message: "Hospital deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
