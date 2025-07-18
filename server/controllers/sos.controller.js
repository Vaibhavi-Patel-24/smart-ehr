import Hospital from "../models/hospital";
import Medical from "../models/medical";

// Controller to handle SOS from patient
export const handleSOS = async (req, res) => {
  const { patientId, location } = req.body;

  try {
    // Find nearest hospitals (within 5 km)
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: location,
          $maxDistance: 5000
        }
      }
    });

    if (!hospitals.length) {
      return res.status(404).json({ message: 'No hospitals nearby' });
    }

    // Get medicals under those hospitals
    const medicals = await Medical.find({
      hospitalId: { $in: hospitals.map(h => h.hospitalId) }
    });

    // Emit SOS to all connected medicals (using their socket userId)
    medicals.forEach(med => {
      const socketId = onlineUsers[med.medicalId]; // ← Maintain a map of connected users
      if (socketId) {
        io.to(socketId).emit('sos-alert', {
          patientId,
          location,
          hospitalName: hospitals.find(h => h.hospitalId === med.hospitalId)?.name || ''
        });
      }
    });
    
    res.status(200).json({ message: 'SOS sent to nearby hospitals.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while handling SOS.' });
  }
};
