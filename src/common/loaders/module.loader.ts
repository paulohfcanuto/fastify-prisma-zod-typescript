import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { RouteRegistry } from '../registry/route.registry';

export class ModuleLoader {
  static async loadModules(prisma: PrismaClient): Promise<void> {
    const modulesPath = path.join(__dirname, '../../modules');
    const modules = fs.readdirSync(modulesPath);

    for (const module of modules) {
      const routePath = path.join(modulesPath, module, `${module}.routes.ts`);

      if (fs.existsSync(routePath)) {
        const { default: RouteClass } = await import(routePath);
        if (RouteClass) {
          RouteRegistry.addRoute(new RouteClass(prisma));
        }
      }
    }
  }
}
