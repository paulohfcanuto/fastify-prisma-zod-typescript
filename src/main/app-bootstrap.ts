import { Server } from './server.ts';

async function bootstrap(): Promise<void> {
  const server = new Server();
  await server.start();
}

bootstrap().catch(error => {
  console.error('Error bootstrapping application:', error);
  process.exit(1);
});
