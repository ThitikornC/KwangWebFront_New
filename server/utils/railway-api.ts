/**
 * Railway GraphQL API Client
 * ใช้แทน Railway CLI สำหรับ server-side operations
 * 
 * Documentation: https://docs.railway.app/reference/public-api
 */

const RAILWAY_API_URL = 'https://backboard.railway.app/graphql/v2';

/**
 * Execute GraphQL query/mutation to Railway API
 */
export async function railwayQuery(query: string, variables: Record<string, any> = {}, apiToken?: string): Promise<any> {
  const token = apiToken || process.env.RAILWAY_API_TOKEN;
  
  if (!token) {
    throw new Error('RAILWAY_API_TOKEN is required');
  }

  const response = await fetch(RAILWAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Railway API HTTP ${response.status}: ${text}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data;
}

/**
 * Get current user info
 */
export async function getMe(apiToken?: string) {
  const query = `
    query {
      me {
        id
        email
        name
      }
    }
  `;
  return railwayQuery(query, {}, apiToken);
}

/**
 * Create a new project
 */
export async function createProject(name: string, apiToken?: string): Promise<{ id: string; name: string }> {
  const query = `
    mutation projectCreate($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        id
        name
      }
    }
  `;
  const result = await railwayQuery(query, { input: { name } }, apiToken);
  return result.projectCreate;
}

/**
 * Get project details
 */
export async function getProject(projectId: string, apiToken?: string) {
  const query = `
    query project($id: String!) {
      project(id: $id) {
        id
        name
        description
        environments {
          edges {
            node {
              id
              name
            }
          }
        }
        services {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  `;
  const result = await railwayQuery(query, { id: projectId }, apiToken);
  return result.project;
}

/**
 * Create a service in a project (from GitHub repo)
 */
export async function createServiceFromRepo(
  projectId: string, 
  name: string,
  repoUrl: string,
  branch: string = 'main',
  apiToken?: string
): Promise<{ id: string; name: string }> {
  // First, create a service
  const createQuery = `
    mutation serviceCreate($input: ServiceCreateInput!) {
      serviceCreate(input: $input) {
        id
        name
      }
    }
  `;
  
  const result = await railwayQuery(createQuery, {
    input: {
      projectId,
      name,
      source: {
        repo: repoUrl
      }
    }
  }, apiToken);

  return result.serviceCreate;
}

/**
 * Create an empty service in a project
 */
export async function createService(
  projectId: string, 
  name: string,
  apiToken?: string
): Promise<{ id: string; name: string }> {
  const query = `
    mutation serviceCreate($input: ServiceCreateInput!) {
      serviceCreate(input: $input) {
        id
        name
      }
    }
  `;
  
  const result = await railwayQuery(query, {
    input: { projectId, name }
  }, apiToken);

  return result.serviceCreate;
}

/**
 * Connect service to GitHub repo
 */
export async function connectServiceToRepo(
  serviceId: string,
  repoFullName: string,
  branch: string = 'main',
  apiToken?: string
) {
  const query = `
    mutation serviceConnect($id: String!, $input: ServiceConnectInput!) {
      serviceConnect(id: $id, input: $input) {
        id
      }
    }
  `;

  return railwayQuery(query, {
    id: serviceId,
    input: {
      repo: repoFullName,
      branch
    }
  }, apiToken);
}

/**
 * Get environment ID for a project (usually "production")
 */
export async function getEnvironmentId(projectId: string, envName: string = 'production', apiToken?: string): Promise<string | null> {
  const project = await getProject(projectId, apiToken);
  const env = project.environments.edges.find((e: any) => 
    e.node.name.toLowerCase() === envName.toLowerCase()
  );
  return env ? env.node.id : null;
}

/**
 * Get service ID by name
 */
export async function getServiceId(projectId: string, serviceName: string, apiToken?: string): Promise<string | null> {
  const project = await getProject(projectId, apiToken);
  const service = project.services.edges.find((s: any) => 
    s.node.name.toLowerCase() === serviceName.toLowerCase()
  );
  return service ? service.node.id : null;
}

/**
 * Get environment variables
 */
export async function getVariables(projectId: string, environmentId: string, serviceId: string, apiToken?: string) {
  const query = `
    query variables($projectId: String!, $environmentId: String!, $serviceId: String!) {
      variables(
        projectId: $projectId
        environmentId: $environmentId
        serviceId: $serviceId
      )
    }
  `;
  const result = await railwayQuery(query, { projectId, environmentId, serviceId }, apiToken);
  return result.variables || {};
}

/**
 * Set/Update environment variables (upsert multiple at once)
 */
export async function setVariables(
  projectId: string, 
  environmentId: string, 
  serviceId: string, 
  variables: Record<string, string>,
  apiToken?: string
) {
  const query = `
    mutation variableCollectionUpsert($input: VariableCollectionUpsertInput!) {
      variableCollectionUpsert(input: $input)
    }
  `;
  return railwayQuery(query, {
    input: {
      projectId,
      environmentId,
      serviceId,
      variables
    }
  }, apiToken);
}

/**
 * Trigger a redeploy for a service
 */
export async function redeploy(environmentId: string, serviceId: string, apiToken?: string) {
  const query = `
    mutation serviceInstanceRedeploy($environmentId: String!, $serviceId: String!) {
      serviceInstanceRedeploy(environmentId: $environmentId, serviceId: $serviceId)
    }
  `;
  return railwayQuery(query, { environmentId, serviceId }, apiToken);
}

/**
 * Get deployments for a service
 */
export async function getDeployments(projectId: string, serviceId: string, environmentId: string, limit: number = 10, apiToken?: string) {
  const query = `
    query deployments($projectId: String!, $serviceId: String!, $environmentId: String!, $first: Int) {
      deployments(
        first: $first
        input: {
          projectId: $projectId
          serviceId: $serviceId
          environmentId: $environmentId
        }
      ) {
        edges {
          node {
            id
            status
            createdAt
          }
        }
      }
    }
  `;
  const result = await railwayQuery(query, { projectId, serviceId, environmentId, first: limit }, apiToken);
  return result.deployments?.edges?.map((e: any) => e.node) || [];
}

/**
 * Get latest deployment status
 */
export async function getLatestDeploymentStatus(projectId: string, serviceId: string, environmentId: string, apiToken?: string): Promise<string | null> {
  const deployments = await getDeployments(projectId, serviceId, environmentId, 1, apiToken);
  return deployments.length > 0 ? deployments[0].status : null;
}

/**
 * Wait for deployment to complete
 */
export async function waitForDeployment(
  projectId: string, 
  serviceId: string, 
  environmentId: string, 
  timeoutMs: number = 300000,
  pollIntervalMs: number = 10000,
  apiToken?: string
): Promise<{ success: boolean; status: string }> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    const status = await getLatestDeploymentStatus(projectId, serviceId, environmentId, apiToken);
    
    if (!status) {
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
      continue;
    }

    // Possible statuses: BUILDING, DEPLOYING, SUCCESS, FAILED, CRASHED, REMOVED
    if (status === 'SUCCESS') {
      return { success: true, status };
    }
    
    if (['FAILED', 'CRASHED', 'REMOVED'].includes(status)) {
      return { success: false, status };
    }

    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }

  return { success: false, status: 'TIMEOUT' };
}

/**
 * Get domains for a service
 */
export async function getDomains(projectId: string, environmentId: string, serviceId: string, apiToken?: string) {
  const query = `
    query domains($projectId: String!, $environmentId: String!, $serviceId: String!) {
      domains(
        projectId: $projectId
        environmentId: $environmentId
        serviceId: $serviceId
      ) {
        serviceDomains {
          id
          domain
        }
        customDomains {
          id
          domain
        }
      }
    }
  `;
  const result = await railwayQuery(query, { projectId, environmentId, serviceId }, apiToken);
  return result.domains;
}

/**
 * Create a Railway domain for a service (*.up.railway.app)
 */
export async function createServiceDomain(environmentId: string, serviceId: string, apiToken?: string): Promise<{ id: string; domain: string }> {
  const query = `
    mutation serviceDomainCreate($input: ServiceDomainCreateInput!) {
      serviceDomainCreate(input: $input) {
        id
        domain
      }
    }
  `;
  const result = await railwayQuery(query, {
    input: { environmentId, serviceId }
  }, apiToken);
  return result.serviceDomainCreate;
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string, apiToken?: string) {
  const query = `
    mutation projectDelete($id: String!) {
      projectDelete(id: $id)
    }
  `;
  return railwayQuery(query, { id: projectId }, apiToken);
}

/**
 * Delete a service
 */
export async function deleteService(serviceId: string, apiToken?: string) {
  const query = `
    mutation serviceDelete($id: String!) {
      serviceDelete(id: $id)
    }
  `;
  return railwayQuery(query, { id: serviceId }, apiToken);
}

/**
 * Full deployment flow using API only (no CLI)
 * 1. Create project
 * 2. Create service from GitHub repo
 * 3. Set environment variables
 * 4. Create domain
 * 5. Wait for deployment
 */
export async function deployFromGitHub(
  projectName: string,
  repoFullName: string,
  envVars: Record<string, string> = {},
  branch: string = 'main',
  apiToken?: string
): Promise<{
  projectId: string;
  serviceId: string;
  environmentId: string;
  domain: string;
  status: string;
}> {
  console.log(`[Railway API] Creating project: ${projectName}`);
  const project = await createProject(projectName, apiToken);
  const projectId = project.id;
  console.log(`[Railway API] Project created: ${projectId}`);

  // Get the default production environment
  const environmentId = await getEnvironmentId(projectId, 'production', apiToken);
  if (!environmentId) {
    throw new Error('Failed to get production environment ID');
  }
  console.log(`[Railway API] Environment ID: ${environmentId}`);

  // Create service from GitHub repo
  console.log(`[Railway API] Creating service from repo: ${repoFullName}`);
  const service = await createServiceFromRepo(projectId, projectName, repoFullName, branch, apiToken);
  const serviceId = service.id;
  console.log(`[Railway API] Service created: ${serviceId}`);

  // Set environment variables if provided
  if (Object.keys(envVars).length > 0) {
    console.log(`[Railway API] Setting ${Object.keys(envVars).length} environment variables`);
    await setVariables(projectId, environmentId, serviceId, envVars, apiToken);
  }

  // Create domain
  console.log(`[Railway API] Creating domain...`);
  const domainResult = await createServiceDomain(environmentId, serviceId, apiToken);
  const domain = `https://${domainResult.domain}`;
  console.log(`[Railway API] Domain created: ${domain}`);

  // Wait for deployment (optional - can be configured)
  console.log(`[Railway API] Waiting for deployment...`);
  const deployResult = await waitForDeployment(projectId, serviceId, environmentId, 300000, 10000, apiToken);
  console.log(`[Railway API] Deployment status: ${deployResult.status}`);

  return {
    projectId,
    serviceId,
    environmentId,
    domain,
    status: deployResult.status
  };
}

export default {
  railwayQuery,
  getMe,
  createProject,
  getProject,
  createService,
  createServiceFromRepo,
  connectServiceToRepo,
  getEnvironmentId,
  getServiceId,
  getVariables,
  setVariables,
  redeploy,
  getDeployments,
  getLatestDeploymentStatus,
  waitForDeployment,
  getDomains,
  createServiceDomain,
  deleteProject,
  deleteService,
  deployFromGitHub
};
