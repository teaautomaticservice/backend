import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;
}
