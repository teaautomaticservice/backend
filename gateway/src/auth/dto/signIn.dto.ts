import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly password: string;
}
