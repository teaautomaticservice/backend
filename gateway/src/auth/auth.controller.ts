import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'gateway/auth/auth.service';
import { SignInDTO } from 'gateway/auth/dto/signIn.dto';
import { SignUpDTO } from 'gateway/auth/dto/signUp.dto';
import { AccessTokensDTO } from 'gateway/auth/dto/accessTokens.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully sign in',
    type: AccessTokensDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.PAYMENT_REQUIRED,
    description: 'Invalid credentials',
  })
  @Post('/sign-in')
  public async signIn(@Body() userData: SignInDTO): Promise<AccessTokensDTO> {
    return await this.authService.signIn(userData);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully sign up',
    type: AccessTokensDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Passwords do not match',
  })
  @ApiResponse({
    status: HttpStatus.PAYMENT_REQUIRED,
    description: 'Email address already in use',
  })
  @Post('/sign-up')
  public async signUp(@Body() userData: SignUpDTO): Promise<AccessTokensDTO> {
    return await this.authService.signUp(userData);
  }
}
