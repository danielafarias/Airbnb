import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: "Cria um usuário"
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "Listar todos os usuários"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard()) 
  readAll(): Promise<UserDto[]>{
    return this.userService.readAll();
  }

  @Get(':id') 
  @ApiOperation({
    summary: "Ler apenas um usuário pelo id"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard()) 
  readOnly(@Param('id') userId: string): Promise<User>{
    return this.userService.readOnly(userId);
  }

  @Patch()
  @ApiOperation({
    summary: "Atualizar o usuário autenticado"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard()) 
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @ApiOperation({
    summary: "Excluir usuário autenticado"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard()) 
  delete(@LoggedUser() user: User): Promise<User> {
    return this.userService.delete(user.id);
  }
}
