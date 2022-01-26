import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginInputDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}