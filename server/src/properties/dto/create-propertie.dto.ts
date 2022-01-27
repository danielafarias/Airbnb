import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUrl, IsNumber } from "class-validator";

export class CreatePropertieDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    @ApiProperty()
    imageUrl: string;
}