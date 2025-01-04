import { version } from '../../../package.json';

export const VERSION = {
  number: version,
  apiVersion: process.env.API_VERSION || 'v1'
};
