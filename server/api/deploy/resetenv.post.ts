import { getProjectById } from '../../utils/db';
import { setRailwayEnvVars } from '../../utils/railway';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { projectId } = body;
  if (!projectId) {
    return { success: false, error: 'Missing projectId' };
  }

  // 1. ดึงข้อมูลโปรเจคจาก DB
  const project = await getProjectById(projectId);
  if (!project) {
    return { success: false, error: 'Project not found' };
  }

  // 2. เตรียมข้อมูล env ที่จะ set (อาจจะดึงจาก project หรือคำนวณใหม่)
  const envVars = {
    CUSTOMER_NAME: project.customerName,
    DB_NAME: project.dbName,
    // ...เพิ่ม env อื่นๆ ตามต้องการ
  };

  // 3. เรียก Railway CLI หรือ API เพื่อ set env
  const result = await setRailwayEnvVars(projectId, envVars);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, message: 'Environment variables updated', details: result.details };
});
