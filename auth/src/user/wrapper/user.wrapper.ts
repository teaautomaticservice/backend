import { User } from "auth/user/entity/user.entity";
import { UserDTO } from "auth/user/dto/user.dto";

export class UserWrapper implements UserDTO {
    public readonly id: string;
    public readonly email: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly isActive: boolean;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;

    constructor(model: User) {
        this.id = model.id;
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.isActive = model.isActive;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
        this.deletedAt = model.deletedAt;
    }
}
