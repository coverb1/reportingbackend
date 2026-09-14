import {BadRequestException,ConflictException,Injectable,UnauthorizedException,} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

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
        role:Role.CITIZEN,
        cellId:village.cell.id, //Get the ID of the Cell where this user's village is located.
        sectorId:village.cell.Sector.id,
        districtId:village.cell.Sector.district.id,     
      },
    });

    console.log("registration succesfull")

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

  async forgotpassword(email:string){
    const user=await this.prisma.user.findUnique({
      where:{email}
    })
    if (!user) {
      throw new UnauthorizedException("user does not exist")
    }

const token=randomBytes(32).toString('hex')
await this.prisma.user.update({
  where:{email},
  data:{
    resetToken:token,
    resetTokenExpiry:new Date(Date.now()+1000*60*10)
  }
})
const resetLink=`http://localhost:3001/ResertPassword?token=${token}`;
await this.mailerservice.sendMail({
  to:email,
  subject:"reset password",
  text:`click this link  to resert Password: ${resetLink}`
})
  }

  async ResetPasswod(token:string,newPassword:string){
    const user=await this.prisma.user.findFirst({
      where:{
      resetToken:token,
      resetTokenExpiry:{gt:new Date()}
      }
    })
    console.log(`$user is:${user}`)
     if (!user) {
    throw new BadRequestException('Token is invalid or expired')
  }
   const hashedPassword=await bcrypt.hash(newPassword,20)

  await this.prisma.user.update({
    where:{id:user.id},
    data:{
      password:hashedPassword,
      resetToken:null,
      resetTokenExpiry:null
    }
  })
  }

}