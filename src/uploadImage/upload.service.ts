import { BadRequestException, Injectable } from "@nestjs/common";
import type { Express } from "express";
import cloudinary from '../cloudinary.config.js'
import { PrismaService } from '../prisma.service.js';
@Injectable()

export class UploadService {
    async uploadImage(file: Express.Multer.File,userId:string) {
        if (!file) {
            throw new BadRequestException("please select an image")
        }

        // if some one uploads pdf
        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException("Please  upload i image file")
        }

        const results = await cloudinary.uploader.upload(
           `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
                folder: 'profile-images',
                resource_type: 'image',
            },
        );

// Save the Cloudinary URL in the user's database record
const user=await this.prisma

        return{
            message:"ImageUploaded Well",
            imageURL:results.secure_url,
            publicId:results.public_id
        }
    }
}