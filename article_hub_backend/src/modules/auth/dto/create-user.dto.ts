import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    emailAddress: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsStrongPassword()
    password: string;
}
