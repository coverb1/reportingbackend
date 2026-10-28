import {BadRequestException,Controller,Post,UploadedFile,UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import type { Express } from 'express';
import { UploadService } from './upload.service.js';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('profile')
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
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file);
  }
}
