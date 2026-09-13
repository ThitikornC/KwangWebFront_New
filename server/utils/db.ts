import { connectToDatabase } from './mongo';
import { Lead } from './models';

export async function getProjectById(projectId: string) {
  await connectToDatabase();
  console.log('DEBUG: Searching for projectId', projectId);
  const project = await Lead.findOne({ railwayProjectId: projectId });
  console.log('DEBUG: Found project', project);
  if (!project) return null;
  return {
    customerName: project.name || '',
    dbName: `db_${project.railwayProjectId}`,
    ...project.toObject(),
  };
}
