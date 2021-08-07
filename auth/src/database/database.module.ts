import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from 'auth/database/typeorm.config';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class DatabaseModule {
}
