import { IsString, IsEmail, IsNotEmpty, MinLength, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsEmail() 
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'A senha deve ter no mínimo seis caractéres.'})
    password: string;
    passwordConfirmation: string;

    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;
}