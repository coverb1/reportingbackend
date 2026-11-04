import {BadRequestException,Controller,Post,UploadedFile,UseInterceptors,UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from '../auth/me/current-user.decorator.js';
import type { Express } from 'express';
import { UploadService } from './upload.service.js';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  // @UseInterceptors(FileInterceptor(...)) tells NestJS how to handle a file uploaded by the user.
// FileInterceptor() Expect a file from the frontend, and look for it under the name file
  @UseInterceptors(
    FileInterceptor('file', {
      // storage: diskStorage({
      //   destination: './uploads',
      //   filename: (req, file, callback) => {
      //     callback(
      //       null,
      //       randomUUID() + extname(file.originalname),
      //     );
      //   },
      // }),

      limits: {
        fileSize: 5 * 1024 * 1024,
      },

      fileFilter: (req, file, callback) => {
        const allowed = [
          'image/jpeg',
          'image/png',
          'image/webp',
        ];

        if (!allowed.includes(file.mimetype)) {
          return callback(
            new BadRequestException('Invalid image type'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user:{userId:string},
  ) {
    return this.uploadService.uploadImage(file,user.userId);
  }
}
