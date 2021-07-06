import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { SaveRefreshToken } from './dto/saveRefreshToken.dto';
import { SignInDTO } from './dto/signIn.dto';
import { SingUpDTO } from './dto/signUp.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @EventPattern('user-sign-in')
    async handleUserSingIn(data: SignInDTO): Promise<UserDTO> {
        return await this.usersService.userSingIn(data);
    }

    @EventPattern('user-sign-up')
    async handleUserSingUp(data: SingUpDTO): Promise<UserDTO> {
        return await this.usersService.userSingUp(data);
    }

    @EventPattern('user-save-refrash-token')
    async handleSaveRefreshToken(data: SaveRefreshToken): Promise<void> {
        await this.usersService.saveRefreshToken(data);
    }
}
