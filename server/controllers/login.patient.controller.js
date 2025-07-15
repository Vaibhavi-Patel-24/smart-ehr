import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Patient from "../models/patient.js";

export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Patient.findOne({ email });
    console.log(user)
    if (!user) return res.status(404).json({ message: "Patient user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Patient login successful", user });
  }catch (err) {
    res.status(500).json({ message: "Server error",err});
  }
}