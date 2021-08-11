import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: Record<string, Record<string, string | any>> = {};

  constructor() {
    this.envConfig = {
      app: {
        port: process.env.GATEWAY_SERVICE_PORT,
      },
      authService: {
        options: {
          port: process.env.AUTH_SERVICE_PORT,
          host: process.env.AUTH_SERVICE_HOST,
        },
        transport: Transport.TCP,
      },
    };
  }

  public get(key: string): any {
    return this.envConfig[key];
  }
}
