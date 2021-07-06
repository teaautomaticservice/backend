import { CreateToken } from '../interfaces/createToken.interface';

export class DataWrapper implements CreateToken {
    public readonly email: string;
    public readonly lastName: string;
    public readonly firstName: string;

    constructor(model: CreateToken) {
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}
