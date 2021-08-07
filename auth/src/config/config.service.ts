export class ConfigService {
    private readonly envConfig: Record<string, Record<string, string | any>> = {};

    constructor() {
        this.envConfig = {
            app: {
                port: process.env.AUTH_SERVICE_PORT,
                host: process.env.AUTH_SERVICE_HOST,
            },
            accessConfig: {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
            },
            refreshConfig: {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
            },
            db: {
                password: process.env.DATABASE_PASSWORD,
                username: process.env.DATABASE_USERNAME,
                port: process.env.DATABASE_PORT,
                name: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                type: process.env.DATABASE_TYPE,
            }
        };
    }

    get(key: string) {
        return this.envConfig[key];
    }
}
