import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { authaconstants } from './auth.constants.js';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma.service.js';
import { JwtStrategy } from './jwt.strategy.js';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [
    PassportModule.register({
      defaultStrategy:'jwt',
    }),
    JwtModule.register({
    secret: authaconstants.secrete,
    signOptions: { expiresIn: '1D' }
  }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'cboy85096@gmail.com',
          pass: 'zbzu rcii nqoy yxkd'
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule { }

// Passport is a tool that helps NestJS handle authentication.
// JwtStrategy is responsible for checking whether a JWT token is valid.
// AuthGuard('jwt') protects your routes.