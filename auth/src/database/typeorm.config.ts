import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from 'auth/config/config.service';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: new ConfigService().get('db').type as any,
  host: new ConfigService().get('db').host,
  port: Number(new ConfigService().get('db').port),
  username: new ConfigService().get('db').username,
  password: new ConfigService().get('db').password,
  database: new ConfigService().get('db').name,
  entities: ['./dist/**/*.entity.{js,ts}'],
  synchronize: true,
  logging: false,
};
