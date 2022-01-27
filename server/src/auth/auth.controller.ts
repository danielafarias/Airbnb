import { LoginInputDto } from './dto/login-input.dto';
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { LoggedUser } from './logged-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post() 
  @ApiOperation({
    summary: "Entradas de login"
  })
  login(@Body() loginInputDto: LoginInputDto): Promise<LoginResponseDto> {
    return this.authService.login(loginInputDto);
  }

  @Get()
  @ApiOperation({
    summary: "Usuário logado"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  me(@LoggedUser() user: User) {
    return user;
  }
}
