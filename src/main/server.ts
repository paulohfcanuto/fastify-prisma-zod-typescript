import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import { ModuleLoader } from '../common/loaders/module.loader';
import { RouteRegistry } from '../common/registry/route.registry';

export class Server {
  private app: FastifyInstance;
  private port: number;
  private host: string;
  private prisma: PrismaClient;

  constructor() {
    this.app = fastify({
      logger: {
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino-pretty',
        },
      },
    });
    this.port = Number(process.env.SERVER_PORT) || 3000;
    this.host = process.env.SERVER_HOST || '0.0.0.0';
    this.prisma = new PrismaClient();
  }

  private async registerModules(): Promise<void> {
    await ModuleLoader.loadModules(this.prisma);
  }

  private async registerPlugins(): Promise<void> {
    // Register CORS
    await this.app.register(cors, {
      origin: true, // Replace with your frontend URL in production
      credentials: true,
    });

    // Register Swagger
    await this.app.register(swagger, {
      swagger: {
        info: {
          title: 'Todo App API',
          description: 'Todo App API documentation',
          version: '1.0.0',
        },
        host: `${this.host}:${this.port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      },
    });

    await this.app.register(swaggerUi, {
      routePrefix: '/documentation',
    });
  }

  private async registerRoutes(): Promise<void> {
    // Register all module routes
    await RouteRegistry.registerAll(this.app);
  }

  async start(): Promise<void> {
    try {
      await this.registerModules();
      await this.registerPlugins();
      await this.registerRoutes();

      await this.app.listen({ port: this.port, host: this.host });
      console.log(`Server is running on http://${this.host}:${this.port}`);
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }
}