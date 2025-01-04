import { FastifyInstance } from 'fastify';
import { IRoute } from '../interfaces/route.interface';

export class RouteRegistry {
  private static routes: IRoute[] = [];

  static addRoute(route: IRoute): void {
    this.routes.push(route);
  }

  static async registerAll(app: FastifyInstance): Promise<void> {
    for (const route of this.routes) {
      await route.register(app);
    }
  }
}
