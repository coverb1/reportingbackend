import { Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';
import path from 'path';

@Injectable()

export class UploadService{
    uploadImage(photo:Express.Multer.File){
        if (!photo) {
            throw new BadRequestException("Please select an Image")
        }
        return{
            message:"Image upload successfully",
            filename:photo.filename,
            path:`upload/${photo.filename}`
        }
    }
}