# REST API with Prisma Zod and Fastify

## Getting started

### 1. Do the local setup

Create a file called .env.local

```
# Server Configuration
SERVER_PORT=3000
SERVER_HOST="0.0.0.0"
NODE_ENV="development"

# Database Configuration
DATABASE_URL=postgresql://postgres:admin@0.0.0.0:5432/todo_app?schema=public
DATABASE_POOL_SIZE=20

# API Configuration
API_VERSION="v1"
API_PORT=8080

# External Services
REDIS_URL="redis://localhost:6379"
AWS_ACCESS_KEY="your-access-key"
AWS_SECRET_KEY="your-secret-key"
AWS_REGION="us-east-1"

# Logging
LOG_LEVEL="debug"
```

Install npm dependencies:

```
npm install
```

### 2. Run the server

```
npm run start:dev
```