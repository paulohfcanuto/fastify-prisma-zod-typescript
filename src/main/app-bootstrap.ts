import { Server } from './server';

async function bootstrap() {
  const server = new Server();
  await server.start();
}

bootstrap().catch((error) => {
  console.error('Error bootstrapping application:', error);
  process.exit(1);
});