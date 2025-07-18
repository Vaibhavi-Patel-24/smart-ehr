import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
  hospitalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
      
    }
  },
  address: String,
  contact: String,
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

hospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
