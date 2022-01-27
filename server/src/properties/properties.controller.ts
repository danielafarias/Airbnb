import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertieDto } from './dto/create-propertie.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({
    summary: "Cadastrar uma propriedade"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() createPropertieDto: CreatePropertieDto, @LoggedUser() user: User) {
    return this.propertiesService.create(createPropertieDto, user.id)
  }

  @Get() 
  @ApiOperation({
    summary: "Lista todas as propriedades"
  })
  readAll() {
    return this.propertiesService.readAll();
  }
}
