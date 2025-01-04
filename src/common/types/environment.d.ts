declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server Configuration
      SERVER_PORT: string;
      SERVER_HOST: string;
      NODE_ENV: 'development' | 'production' | 'test';

      // Version Configuration
      VERSION: string;
      API_VERSION: string;

      // Database Configuration
      DATABASE_URL: string;
      DATABASE_POOL_SIZE: string;

      // JWT Configuration
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;

      // API Configuration
      API_PORT: string;

      // External Services
      REDIS_URL: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_KEY: string;
      AWS_REGION: string;

      // Logging
      LOG_LEVEL: string;
    }
  }
}

export {};
