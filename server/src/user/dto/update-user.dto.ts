import { IsString, IsEmail, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    lastName: string;

    @IsNotEmpty()
    @IsUrl()
    @IsString()
    @IsOptional()
    imageUrl: string;
}