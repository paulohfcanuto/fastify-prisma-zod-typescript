import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';
import { RouteRegistry } from '../registry/route.registry.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ModuleLoader {
  static async loadModules(prisma: PrismaClient): Promise<void> {
    const modulesPath = join(__dirname, '../../modules');
    const modules = readdirSync(modulesPath);

    for (const module of modules) {
      const routePath = join(modulesPath, module, `${module}.routes.ts`);

      if (existsSync(routePath)) {
        const { default: RouteClass } = await import(routePath);
        if (RouteClass) {
          RouteRegistry.addRoute(new RouteClass(prisma));
        }
      }
    }
  }
}
