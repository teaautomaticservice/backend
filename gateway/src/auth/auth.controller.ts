import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-in')
    public async signIn(@Body() data: SignInDTO): Promise<any> {
        return await this.authService.signIn(data);
    }

    @Post('/sign-up')
    public async signUp(@Body() data: SignUpDTO): Promise<any> {
        return await this.authService.signUp(data);
    }
}
