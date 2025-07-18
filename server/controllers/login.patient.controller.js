import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Patient from "../models/patient.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  console.log(`loggingIn: ${email}`)
  try {
    const user = await Patient.findOne({ email });
    if (!user) {
      console.log(`patient not found`)
      return res.status(404).json({ message: "Patient user not found" });}
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){

        console.log(`Invalid Password`)
        return res.status(401).json({ message: "Invalid credentials" });
      } 

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JSON_KEY,
      { expiresIn: '3d' }
    );
    console.log(`Patient loggedIn: ${user.patientId}`)
    res.status(200).json({
      message: "Patient login successful",
      token,
      patientId: user.patientId, // ✅ Add this
      name: user.name,           // Optional if needed later
      email: user.email          // Optional
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", err: err.message });
  }
};
