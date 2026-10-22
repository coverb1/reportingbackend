import { Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';
import path from 'path';

@Injectable()

export class UploadService{
    uploadImage(file:Express.Multer.File){
        if (!file) {
            throw new BadRequestException("Please select an Image")
        }
        return{
            message:"Image upload successfully",
            filename:file.filename,
            path:`upload/${file.filename}`
        }
    }
}