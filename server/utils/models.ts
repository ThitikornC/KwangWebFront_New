import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  contactno: { type: String },
  company: String,
  installer: String,
  message: String,
  url: String,
  deployedUrl: String,
  runNumber: { type: Number },
  type: { type: String }, // e.g. '1' government, '2' private, '3' general
  contractNumber: String,
  contractImage: String,
  startDate: Date,
  expiryDate: Date,
  status: { type: String, default: 'pending_approval' }, // pending_approval, creating_project, project_created, deployed, rejected
  createdAt: { type: Date, default: Date.now },
  railwayProjectId: String,
  railwayServiceId: String,
  railwayEnvironmentId: String,
});

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
