import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsUrl()
    @IsString()
    @IsOptional()
    @ApiProperty()
    imageUrl: string;
}