export interface ServerConfig {
  port: number;
}

export interface LoggerConfig {
  level: string;
}

export interface ApiConfig {
  endpoint: string;
  timeout?: number;
}

export interface MessageSettings {
  gifUrl: string;
  altText: string;
}

export interface Config {
  production: boolean;
  api: ApiConfig;
  server: ServerConfig;
  logger: LoggerConfig;
  messageSettings: MessageSettings;
}
