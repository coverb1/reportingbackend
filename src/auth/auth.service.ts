import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private prisma: PrismaService,
    private mailerservice: MailerService,
  ) {}

  // Register
  async Register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    //find the village

    const village=await this.prisma.village.findUnique({
      where:{
        id:dto.villageId
      },
      include:{
        cell:{
          include:{
            Sector:{
              include:{
                district:true
              }
            }
          }
        }
      }
    })

    if (!village) {
      throw new BadRequestException("invalid village")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
         villageId:dto.villageId,
        password: hashedPassword,
       
      },
    });

    // Do not return password
    const { password, ...result } = user;

    return result;
  }

  //Login
  async login(email: string, password: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    //User does not exist
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //Check password
    const passwordIsCorrect = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //Create JWT token
    const token = this.jwtservice.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Return token
    return {
      accessToken: token,
    };
  }
}