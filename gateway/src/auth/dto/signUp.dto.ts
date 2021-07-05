import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;

    @ApiProperty()
    public passwordRepeat: string;
}
