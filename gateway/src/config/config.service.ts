import { Transport } from '@nestjs/microservices';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            port: process.env.API_GATEWAY_PORT,
            tokenService: {
                options: {
                    port: process.env.TOKEN_SERVICE_PORT,
                    host: process.env.TOKEN_SERVICE_HOST,
                },
                transport: Transport.TCP,
            },
            userService: {
                options: {
                    port: process.env.USER_SERVICE_PORT,
                    host: process.env.USER_SERVICE_HOST,
                },
                transport: Transport.TCP,
            },
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
