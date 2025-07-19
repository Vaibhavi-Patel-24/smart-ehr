import mongoose from 'mongoose';
import nodemailer from 'nodemailer'

export const sendOTPToAdmin = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '92756b001@smtp-brevo.com',
        pass: 'MhDnGRBfvTry8xF2',
      },
    });

    const mailOptions = {
      from: 'vaibhavipatel9424@gmail.com',
      to: email,
      subject: 'Your OTP Code for Admin Account',
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Admin OTP email sent:", info.response);
  } catch (err) {
    console.error("Error sending OTP to admin email:", err);
    throw err;
  }
};

export const sendAdminOTP = async (req, res) => {
  try {
    const { email } = req.body;
        console.log("🔔 OTP request received for:", email);

    if (!email) return res.status(400).json({ message: "Email is required" });

    const adminCollection = mongoose.connection.db.collection('admins');
    const admin = await adminCollection.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await adminCollection.updateOne(
      { email },
      { $set: { otp, otpExpiry: expiry } }
    );

    await sendOTPToAdmin(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error in sendAdminOTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAdminOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const adminCollection = mongoose.connection.db.collection('admins');
    const admin = await adminCollection.findOne({ email });

    if (!admin) {
      return res.status(404).json({ isSuccess: false, message: "Admin not found" });
    }

    // Check OTP and its expiry
    if (admin.otp !== otp || Date.now() > new Date(admin.otpExpiry)) {
      return res.status(400).json({ isSuccess: false, message: "Invalid or expired OTP" });
    }

    // If newPassword is provided, update password
    if (newPassword) {
      await adminCollection.updateOne(
        { email },
        {
          $set: { password: newPassword },
          $unset: { otp: "", otpExpiry: "" }
        }
      );
      return res.status(200).json({ isSuccess: true, message: "Password reset successful" });
    }

    // Only OTP verified
    return res.status(200).json({ isSuccess: true, message: "OTP verified" });

  } catch (err) {
    console.error("❌ Error verifying admin OTP:", err);
    return res.status(500).json({ isSuccess: false, message: "Server error" });
  }
};

