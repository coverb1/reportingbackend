import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { loginDto } from './dto/login.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from './me/current-user.decorator.js';

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
@Post('ForgotPassword')
forgotPassword(@Body("email") email:string){
  return this.authService.forgotpassword(email)
}

 @Post('reset-password')
resetPassword(
  @Body('token') token: string,
  @Body('newPassword') newPassword: string,) {
  return this.authService.ResetPasswod(token, newPassword);
}
@UseGuards(AuthGuard('jwt'))
   @Get('me')
   getMe(@currentUser() user:{id:number,name:string,role:string}){
    return user
   }
}