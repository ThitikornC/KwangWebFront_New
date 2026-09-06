
import { $fetch } from 'ofetch';

const RAILWAY_API_URL = 'https://backboard.railway.app/graphql/v2';
const RAILWAY_API_TOKEN = process.env.RAILWAY_API_TOKEN || process.env.RAILWAY_API_KEY;

export async function setRailwayEnvVars(projectId, envVars) {
  // 1. Get all environments for the project
  const envListRes = await $fetch(RAILWAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query Environments($projectId: String!) { environments(projectId: $projectId) { edges { node { id name } } } }`,
      variables: { projectId },
    }),
  });
  const environments = envListRes?.data?.environments?.edges || [];
  if (!environments.length) return { success: false, error: 'No environments found for project' };
  // 2. Use the first environment (or filter by name if needed)
  const environmentId = environments[0].node.id;

  // 3. Get all services for the project
  const serviceListRes = await $fetch(RAILWAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query Services($projectId: String!) { services(projectId: $projectId) { edges { node { id name } } } }`,
      variables: { projectId },
    }),
  });
  const services = serviceListRes?.data?.services?.edges || [];
  if (!services.length) return { success: false, error: 'No services found for project' };
  // 4. Use the first service (or filter by name if needed)
  const serviceId = services[0].node.id;

  // 5. Set variables for the service/environment
  const setVarsRes = await $fetch(RAILWAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `mutation($input: SetVariablesInput!) { setVariables(input: $input) { id } }`,
      variables: {
        input: {
          environmentId,
          serviceId,
          variables: Object.entries(envVars).map(([k, v]) => ({ name: k, value: v })),
        },
      },
    }),
  });
  if (setVarsRes?.data?.setVariables?.id) {
    return { success: true, details: setVarsRes.data.setVariables };
  } else {
    return { success: false, error: setVarsRes?.errors || 'Unknown error' };
  }
}
