import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { SignInDTO } from './dto/signIn.dto';
import { SingUpDTO } from './dto/signUp.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @EventPattern('user-sign-in')
    async handleUserSingIn(data: SignInDTO): Promise<User> {
        return await this.usersService.userSingIn(data);
    }

    @EventPattern('user-sign-up')
    async handleUserSingUp(data: SingUpDTO): Promise<User> {
        return await this.usersService.userSingUp(data);
    }
}
