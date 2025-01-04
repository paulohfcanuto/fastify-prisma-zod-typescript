import { config } from '@dotenvx/dotenvx';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables based on environment
const envFiles = process.env.CI
  ? [resolve(__dirname, '../../.env.test')]
  : [resolve(__dirname, '../../.env.local')];

// Load appropriate env file with override and disable debug messages
config({
  path: envFiles[0],
  override: true,
  debug: false
});
