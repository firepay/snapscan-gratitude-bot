import { Config } from './models';

// tslint:disable: no-magic-numbers
export const config: Config = {
  production: process.env.PRODUCTION === 'true' || false,
  api: {
    endpoint: process.env.SLACK_HOOK_URI,
    timeout: +process.env.TIMEOUT || 30000
  },
  server: {
    port: +process.env.PORT || 3009
  },
  logger: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  messageSettings: {
    gifUrl: 'https://media.giphy.com/media/GvyaCZcD84RXKy8Jlv/giphy.gif',
    altText: 'Bee Bear Love'
  }
};
