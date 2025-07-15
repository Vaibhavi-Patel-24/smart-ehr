import mongoose from "mongoose";
import Medical from "../models/medical.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const loginMedical = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Medical.findOne({ email });
    console.log(user)
    if (!user) return res.status(404).json({ message: "Medical user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

     const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JSON_KEY,
            {expiresIn:'3d'}
        );

    console.log(token)
    res.status(200).json({ message: "Medical login successful", user,token });
  }catch (err) {
    res.status(500).json({ message: "Server error",err});
  }
}