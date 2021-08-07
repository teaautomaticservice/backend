import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from "auth/database/database.module";

@Module({
  imports: [TokenModule, UserModule, DatabaseModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
