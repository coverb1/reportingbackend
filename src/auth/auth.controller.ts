import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';

import { AuthService } from './auth.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { loginDto } from './dto/login.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from './me/current-user.decorator.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { jwtAuthGuard } from './jwt-guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.Register(registerDto);
  }
  @Post('login')
  login(@Body() logindto: loginDto) {
    return this.authService.login(logindto.email, logindto.password)
  }
  @Post('ForgotPassword')
  forgotPassword(@Body("email") email: string) {
    return this.authService.forgotpassword(email)
  }

@Patch("profileUpdate")
@UseGuards(jwtAuthGuard)

async updateProfile(
  @currentUser() user:any, //get the imformation of the user who is currently login
  @Body() dto:UpdateProfileDto,  //This gets the new information sent from the frontend.
){ 
  //It sends two things to our service:
  // user.sub = The ID of the logged-in user.
  // dto = The new information the user wants to save.
  console.log(user)
  return this.authService.updateProfile(user.userId,dto)
}

  @Post('reset-password')
  resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,) {
    return this.authService.ResetPasswod(token, newPassword);
  }
  @UseGuards(AuthGuard('jwt'))
  
  @Get('me')
  getMe(@currentUser() user: { 
    id: number, name: string, role: string }) {
    return user
  }
}