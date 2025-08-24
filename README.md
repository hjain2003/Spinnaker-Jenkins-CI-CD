# Payment Gateway

Enterprise-grade React payment gateway application with automated infrastructure provisioning and multi-environment deployment pipelines.

## Architecture Overview

**Application**: React frontend containerized and deployed on AWS ECS  
**Infrastructure**: Terraform-managed AWS resources (VPC, Subnets, ALB, ECS, IAM)  
**CI/CD**: Jenkins for continuous integration, Spinnaker for continuous deployment  
**Environments**: Development, Staging, Production with isolated infrastructure

## Technology Stack

- **Frontend**: React application
- **Infrastructure**: Terraform (VPC, Subnets, ALB, ECS, S3, IAM)
- **CI**: Jenkins
- **CD**: Spinnaker (via Halyard)
- **Container Platform**: AWS ECS
- **Cloud Provider**: AWS

## Repository Structure

```
repo/
├── app/
│   ├── Dockerfile
│   └── src/
├── jenkins/
│   └── Jenkinsfile
├── infra/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── outputs.tf
│   ├── staging/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── outputs.tf
│   └── prod/
│       ├── main.tf
│       ├── variables.tf
│       ├── terraform.tfvars
│       └── outputs.tf
└── spinnaker/
    └── pipeline/
        ├── dev.json
        ├── staging.json
        └── prod.json
```

## Deployment Pipeline

Each environment push triggers its dedicated pipeline:

1. **Infrastructure Check**: Terraform validates and provisions AWS resources if needed
2. **Build**: React application containerization via Docker
3. **Push**: Container image pushed to ECR
4. **Deploy**: Spinnaker deploys to target ECS environment

## Environment Configuration

| Environment | Branch | Infrastructure | Deployment |
|-------------|--------|----------------|------------|
| Development | `dev` | infra/dev/ | Auto-deploy |
| Staging | `staging` | infra/staging/ | Auto-deploy |
| Production | `main` | infra/prod/ | Manual approval |

## Infrastructure Components

- **VPC**: Isolated network per environment
- **Subnets**: Public/private subnet configuration
- **ALB**: Application Load Balancer for traffic routing
- **ECS**: Container orchestration service
- **S3**: Terraform state storage
- **IAM**: Service roles and policies

## CI/CD Workflow

```
Code Push → Jenkins CI → Terraform Plan → Docker Build → ECR Push → Spinnaker CD → ECS Deployment
```

**Jenkins**: Handles build, test, and infrastructure validation  
**Spinnaker**: Manages deployment orchestration with environment-specific pipelines  
**Terraform**: Ensures infrastructure consistency across environments

## Quick Start

```bash
# Clone repository
git clone <repository-url>
cd payment-gateway

# Deploy infrastructure (per environment)
cd infra/dev
terraform init
terraform plan
terraform apply

# Build application locally
cd app
docker build -t payment-gateway .
docker run -p 3000:3000 payment-gateway
```

## Pipeline Configuration

Each environment maintains dedicated Spinnaker pipeline configurations in `spinnaker/pipeline/`:
- `dev.json`: Development deployment pipeline
- `staging.json`: Staging deployment pipeline  
- `prod.json`: Production deployment pipeline with approval gates

Pipelines are deployed via Halyard and trigger automatically on successful Jenkins builds.
