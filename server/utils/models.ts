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

/* คำขอติดต่อจากหน้า MOMAY Surprise (ปุ่ม ENLIGHTENED / EXECUTIVE BRIEF)
   เก็บแค่ข้อมูลติดต่อ ไม่ไปผูกกับ flow สร้างโปรเจกต์แบบ Lead */
const momayContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  org: { type: String, required: true },
  phone: { type: String, required: true },
  /** ปุ่มที่กดมา เช่น 'enlightened' | 'executive' */
  source: { type: String },
  /** ป้ายปุ่มตอนกด เก็บไว้อ่านง่ายเวลาดูข้อมูลย้อนหลัง */
  sourceLabel: { type: String },
  /** ประเภทองค์กรที่ผู้ใช้เลือกในแบบสอบถาม ถ้ามี */
  orgType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const MomayContact =
  mongoose.models.MomayContact || mongoose.model('MomayContact', momayContactSchema);
