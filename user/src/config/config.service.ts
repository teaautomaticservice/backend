export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            port: process.env.USER_SERVICE_PORT,
            databasePassword: process.env.DATABASE_PASSWORD,
            databaseUsername: process.env.DATABASE_USERNAME,
            databasePort: process.env.DATABASE_PORT,
            databaseName: process.env.DATABASE_NAME,
            databaseHost: process.env.DATABASE_HOST,
            databaseType: process.env.DATABASE_TYPE,
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
