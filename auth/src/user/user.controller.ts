import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { UserService } from 'auth/user/user.service';
import { SignInDTO } from 'auth/user/dto/signIn.dto';
import { SingUpDTO } from 'auth/user/dto/signUp.dto';
import { AccessTokenDTO } from 'auth/user/dto/accessToken.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @EventPattern('user-sign-in')
  public async handleUserSingIn(data: SignInDTO): Promise<AccessTokenDTO> {
    return await this.usersService.userSingIn(data);
  }

  @EventPattern('user-sign-up')
  public async handleUserSingUp(data: SingUpDTO): Promise<AccessTokenDTO> {
    return await this.usersService.userSingUp(data);
  }
}
