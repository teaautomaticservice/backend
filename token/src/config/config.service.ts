export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            port: process.env.TOKEN_SERVICE_PORT,
            host: process.env.TOKEN_SERVICE_HOST,
            accessConfig: {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
            },
            refreshConfig: {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
            },
        };
    }

    get<T>(key: string): T {
        return this.envConfig[key];
    }
}
