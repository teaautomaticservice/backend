import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from 'src/config/config.service';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: new ConfigService().get('databaseType'),
    host: new ConfigService().get('databaseHost'),
    port: new ConfigService().get('databasePort'),
    username: new ConfigService().get('databaseUsername'),
    password: new ConfigService().get('databasePassword'),
    database: new ConfigService().get('databaseName'),
    entities: ['./dist/**/*.entity.{js,ts}'],
    synchronize: true,
    logging: false,
};
