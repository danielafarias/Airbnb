import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginInputDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;
}