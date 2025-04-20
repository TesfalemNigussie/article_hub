import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    emailAddress : string;

    @IsNotEmpty()
    password : string;
}