import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminCollection = mongoose.connection.db.collection('admins'); // Use your actual collection name
    const admin = await adminCollection.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Direct password check (since not hashed)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

        const token = jwt.sign(
            {id:admin._id,email:admin.email},
            process.env.JSON_KEY,
            {expiresIn:'3d'}
        );

        console.log(token)
    res.status(200).json({ message: "Admin login successful", admin,token});
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
