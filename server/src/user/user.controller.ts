import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard()) 
  readAll(): Promise<UserDto[]>{
    return this.userService.readAll();
  }

  @Get(':id') 
  @UseGuards(AuthGuard()) 
  readOnly(@Param('id') userId: string): Promise<User>{
    return this.userService.readOnly(userId);
  }

  @Patch()
  @UseGuards(AuthGuard()) 
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard()) 
  delete(@LoggedUser() user: User): Promise<User> {
    return this.userService.delete(user.id);
  }
}
