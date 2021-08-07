import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly password: string;

    @ApiProperty()
    public readonly passwordRepeat: string;
}
