import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('Este e-mail já foi utilizado.');
    }

    if(createUserDto.password !== createUserDto.passwordConfirmation) {
        throw new ConflictException('Senhas incompatíveis.')
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.prismaService.user.create({
        data: {
            ...createUserDto,
            password: hashedPassword,
        },
    });

    delete createdUser.password;

    return createdUser;
  }

  async readAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return users;
  }

  async readOnly(userId: string): Promise<User> {
    const userFinder = await this.prismaService.user.findUnique({
      where: { 
        id: userId,
      },
    });

    if (!userFinder) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    delete userFinder.password;

    return userFinder;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const userFinder = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      }
    });

    if (!userFinder) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const emailExists = await this.prismaService.user.findUnique({
      where: {
        email: updateUserDto.email,
      }
    });

    if(emailExists) {
      throw new ConflictException('E-mail já cadastrado.')
    }

    const updatedUser = await this.prismaService.user.update({
      where: {id: userId},
      data: {
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        imageUrl: updateUserDto.imageUrl
      }
    });

    return updatedUser;
  }
}
