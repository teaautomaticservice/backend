import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'auth/user/repository/user.repository';
import { UserController } from 'auth/user/user.controller';
import { UserService } from 'auth/user/user.service';
import { TokenModule } from "auth/token/token.module";

@Module({
    imports: [TokenModule, TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
