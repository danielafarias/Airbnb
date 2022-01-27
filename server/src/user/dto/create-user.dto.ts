import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, MinLength, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsEmail() 
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'A senha deve ter no mínimo seis caractéres.'})
    @ApiProperty()
    password: string;
    passwordConfirmation: string;

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    imageUrl: string;
}