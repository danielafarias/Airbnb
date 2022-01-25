import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get() 
  readAll(): Promise<UserDto[]>{
    return this.userService.readAll();
  }

  @Get(':id') 
  readOnly(@Param('id') userId: string): Promise<User>{
    return this.userService.readOnly(userId);
  }

  @Patch(':id')
  update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(userId, updateUserDto);
  }
}
