#!/usr/bin/env node
/**
 * Railway API Client
 * ใช้ Railway GraphQL API แทน CLI
 * 
 * Environment Variables:
 * - RAILWAY_API_TOKEN: API Token จาก Railway Dashboard
 * - RAILWAY_PROJECT_ID: Project ID (optional, สามารถระบุตอนเรียกใช้)
 * - RAILWAY_SERVICE_ID: Service ID (optional)
 * - RAILWAY_ENVIRONMENT_ID: Environment ID (optional)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env if exists
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const RAILWAY_API_URL = 'https://backboard.railway.app/graphql/v2';
const API_TOKEN = process.env.RAILWAY_API_TOKEN;

if (!API_TOKEN) {
  console.error('Error: RAILWAY_API_TOKEN is required');
  console.error('Set it in .env file or as environment variable');
  process.exit(1);
}

/**
 * Execute GraphQL query/mutation to Railway API
 */
async function railwayQuery(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });

    const options = {
      hostname: 'backboard.railway.app',
      port: 443,
      path: '/graphql/v2',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.errors) {
            reject(new Error(json.errors.map(e => e.message).join(', ')));
          } else {
            resolve(json.data);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Get current user info
 */
async function getMe() {
  const query = `
    query {
      me {
        id
        email
        name
      }
    }
  `;
  return railwayQuery(query);
}

/**
 * List all projects
 */
async function listProjects() {
  const query = `
    query {
      projects {
        edges {
          node {
            id
            name
            description
            createdAt
            updatedAt
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
      }
    }
  `;
  return railwayQuery(query);
}

/**
 * Get project details
 */
async function getProject(projectId) {
  const query = `
    query getProject($projectId: String!) {
      project(id: $projectId) {
        id
        name
        description
        createdAt
        updatedAt
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
              icon
            }
          }
        }
      }
    }
  `;
  return railwayQuery(query, { projectId });
}

/**
 * Get service details
 */
async function getService(serviceId) {
  const query = `
    query getService($serviceId: String!) {
      service(id: $serviceId) {
        id
        name
        icon
        projectId
      }
    }
  `;
  return railwayQuery(query, { serviceId });
}

/**
 * Get deployments for a service
 */
async function getDeployments(projectId, serviceId, environmentId) {
  const query = `
    query getDeployments($projectId: String!, $serviceId: String!, $environmentId: String!) {
      deployments(
        first: 10
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
            meta
          }
        }
      }
    }
  `;
  return railwayQuery(query, { projectId, serviceId, environmentId });
}

/**
 * Get environment variables for a service
 */
async function getVariables(projectId, environmentId, serviceId) {
  const query = `
    query getVariables($projectId: String!, $environmentId: String!, $serviceId: String!) {
      variables(
        projectId: $projectId
        environmentId: $environmentId
        serviceId: $serviceId
      )
    }
  `;
  return railwayQuery(query, { projectId, environmentId, serviceId });
}

/**
 * Set/Update environment variables
 */
async function setVariables(projectId, environmentId, serviceId, variables) {
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
  });
}

/**
 * Delete environment variable
 */
async function deleteVariable(projectId, environmentId, serviceId, name) {
  const query = `
    mutation variableDelete($input: VariableDeleteInput!) {
      variableDelete(input: $input)
    }
  `;
  return railwayQuery(query, {
    input: {
      projectId,
      environmentId,
      serviceId,
      name
    }
  });
}

/**
 * Trigger a redeploy
 */
async function redeploy(environmentId, serviceId) {
  const query = `
    mutation serviceInstanceRedeploy($environmentId: String!, $serviceId: String!) {
      serviceInstanceRedeploy(environmentId: $environmentId, serviceId: $serviceId)
    }
  `;
  return railwayQuery(query, { environmentId, serviceId });
}

/**
 * Get deployment logs
 */
async function getDeploymentLogs(deploymentId) {
  const query = `
    query deploymentLogs($deploymentId: String!) {
      deploymentLogs(deploymentId: $deploymentId) {
        message
        timestamp
        severity
      }
    }
  `;
  return railwayQuery(query, { deploymentId });
}

/**
 * Create a new service
 */
async function createService(projectId, name, source = {}) {
  const query = `
    mutation serviceCreate($input: ServiceCreateInput!) {
      serviceCreate(input: $input) {
        id
        name
      }
    }
  `;
  return railwayQuery(query, {
    input: {
      projectId,
      name,
      ...source
    }
  });
}

/**
 * Delete a service
 */
async function deleteService(serviceId) {
  const query = `
    mutation serviceDelete($id: String!) {
      serviceDelete(id: $id)
    }
  `;
  return railwayQuery(query, { id: serviceId });
}

/**
 * Get domain for a service
 */
async function getDomains(projectId, environmentId, serviceId) {
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
          status {
            dnsRecords {
              fqdn
              hostlabel
              purpose
              requiredValue
              zone
            }
          }
        }
      }
    }
  `;
  return railwayQuery(query, { projectId, environmentId, serviceId });
}

/**
 * Create Railway domain for service
 */
async function createServiceDomain(environmentId, serviceId) {
  const query = `
    mutation serviceDomainCreate($input: ServiceDomainCreateInput!) {
      serviceDomainCreate(input: $input) {
        id
        domain
      }
    }
  `;
  return railwayQuery(query, {
    input: {
      environmentId,
      serviceId
    }
  });
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const projectId = process.env.RAILWAY_PROJECT_ID || args[1];
  const serviceId = process.env.RAILWAY_SERVICE_ID || args[2];
  const environmentId = process.env.RAILWAY_ENVIRONMENT_ID || args[3];

  try {
    switch (command) {
      case 'whoami':
      case 'me':
        const me = await getMe();
        console.log('Logged in as:', me.me.email);
        console.log('Name:', me.me.name);
        console.log('ID:', me.me.id);
        break;

      case 'projects':
      case 'list':
        const projects = await listProjects();
        console.log('\nProjects:');
        projects.projects.edges.forEach(({ node }) => {
          console.log(`\n- ${node.name} (${node.id})`);
          if (node.description) console.log(`  Description: ${node.description}`);
          console.log(`  Environments: ${node.environments.edges.map(e => e.node.name).join(', ')}`);
          console.log(`  Services: ${node.services.edges.map(s => s.node.name).join(', ')}`);
        });
        break;

      case 'project':
        if (!projectId) {
          console.error('Usage: railway-api.js project <projectId>');
          process.exit(1);
        }
        const project = await getProject(projectId);
        console.log('\nProject:', project.project.name);
        console.log('ID:', project.project.id);
        console.log('\nEnvironments:');
        project.project.environments.edges.forEach(({ node }) => {
          console.log(`  - ${node.name} (${node.id})`);
        });
        console.log('\nServices:');
        project.project.services.edges.forEach(({ node }) => {
          console.log(`  - ${node.name} (${node.id})`);
        });
        break;

      case 'deployments':
        if (!projectId || !serviceId || !environmentId) {
          console.error('Usage: railway-api.js deployments <projectId> <serviceId> <environmentId>');
          process.exit(1);
        }
        const deployments = await getDeployments(projectId, serviceId, environmentId);
        console.log('\nRecent Deployments:');
        deployments.deployments.edges.forEach(({ node }) => {
          console.log(`  - ${node.id}`);
          console.log(`    Status: ${node.status}`);
          console.log(`    Created: ${node.createdAt}`);
        });
        break;

      case 'vars':
      case 'variables':
        if (!projectId || !environmentId || !serviceId) {
          console.error('Usage: railway-api.js vars <projectId> <serviceId> <environmentId>');
          process.exit(1);
        }
        const vars = await getVariables(projectId, environmentId, serviceId);
        console.log('\nEnvironment Variables:');
        Object.entries(vars.variables || {}).forEach(([key, value]) => {
          console.log(`  ${key}=${value}`);
        });
        break;

      case 'set-var':
        if (!projectId || !environmentId || !serviceId || !args[4] || !args[5]) {
          console.error('Usage: railway-api.js set-var <projectId> <serviceId> <environmentId> <KEY> <VALUE>');
          process.exit(1);
        }
        const varName = args[4];
        const varValue = args[5];
        await setVariables(projectId, environmentId, serviceId, { [varName]: varValue });
        console.log(`Set ${varName}=${varValue}`);
        break;

      case 'redeploy':
        if (!environmentId || !serviceId) {
          console.error('Usage: railway-api.js redeploy <projectId> <serviceId> <environmentId>');
          process.exit(1);
        }
        await redeploy(environmentId, serviceId);
        console.log('Redeploy triggered successfully');
        break;

      case 'logs':
        const deploymentId = args[1];
        if (!deploymentId) {
          console.error('Usage: railway-api.js logs <deploymentId>');
          process.exit(1);
        }
        const logs = await getDeploymentLogs(deploymentId);
        logs.deploymentLogs.forEach(log => {
          console.log(`[${log.timestamp}] [${log.severity}] ${log.message}`);
        });
        break;

      case 'domains':
        if (!projectId || !environmentId || !serviceId) {
          console.error('Usage: railway-api.js domains <projectId> <serviceId> <environmentId>');
          process.exit(1);
        }
        const domains = await getDomains(projectId, environmentId, serviceId);
        console.log('\nService Domains:');
        domains.domains.serviceDomains.forEach(d => {
          console.log(`  - ${d.domain}`);
        });
        console.log('\nCustom Domains:');
        domains.domains.customDomains.forEach(d => {
          console.log(`  - ${d.domain}`);
        });
        break;

      case 'help':
      default:
        console.log(`
Railway API Client

Usage: node railway-api.js <command> [options]

Commands:
  whoami, me                          - Show current user info
  projects, list                      - List all projects
  project <projectId>                 - Get project details
  deployments <projectId> <serviceId> <environmentId> - List recent deployments
  vars <projectId> <serviceId> <environmentId>        - Get environment variables
  set-var <projectId> <serviceId> <environmentId> <KEY> <VALUE> - Set variable
  redeploy <projectId> <serviceId> <environmentId>    - Trigger redeploy
  logs <deploymentId>                 - Get deployment logs
  domains <projectId> <serviceId> <environmentId>     - Get domains

Environment Variables:
  RAILWAY_API_TOKEN      - Required: Your Railway API token
  RAILWAY_PROJECT_ID     - Optional: Default project ID
  RAILWAY_SERVICE_ID     - Optional: Default service ID  
  RAILWAY_ENVIRONMENT_ID - Optional: Default environment ID

Get your API token from: https://railway.app/account/tokens
        `);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Export functions for use as module
module.exports = {
  railwayQuery,
  getMe,
  listProjects,
  getProject,
  getService,
  getDeployments,
  getVariables,
  setVariables,
  deleteVariable,
  redeploy,
  getDeploymentLogs,
  createService,
  deleteService,
  getDomains,
  createServiceDomain
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
