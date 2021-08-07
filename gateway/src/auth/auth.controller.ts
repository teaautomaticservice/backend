import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from 'gateway/auth/auth.service';
import { SignInDTO } from 'gateway/auth/dto/signIn.dto';
import { SignUpDTO } from 'gateway/auth/dto/signUp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/sign-in')
    public async signIn(@Body() userData: SignInDTO): Promise<any> {
        return await this.authService.signIn(userData);
    }

    @Post('/sign-up')
    public async signUp(@Body() userData: SignUpDTO): Promise<any> {
        return await this.authService.signUp(userData);
    }
}
