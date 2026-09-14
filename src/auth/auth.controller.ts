import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { loginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.Register(registerDto);
  }
  @Post('login')
  login(@Body() logindto:loginDto){
    return this.authService.login(logindto.email,logindto.password)
  }
}