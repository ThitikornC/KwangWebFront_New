import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  company: String,
  message: String,
  url: String,
  runNumber: { type: Number },
  status: { type: String, default: 'pending_approval' }, // pending_approval, deployed, rejected
  createdAt: { type: Date, default: Date.now },
  railwayProjectId: String,
  railwayServiceId: String,
  railwayEnvironmentId: String,
});

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
