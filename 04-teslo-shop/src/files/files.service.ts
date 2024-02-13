import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');
@Injectable()
export class FilesService {
  
  async uploadImage( file: Express.Multer.File ) {
    try {
      const response = await this.uploadFileToCloudinary( file );
      // console.log(response);
      return response;
    } catch (error) {
      throw new BadRequestException('Could not upload image');
    }
  }

  async deleteImage(id: string): Promise<string> {
    try {
      await cloudinary.uploader.destroy(id);
      return `The image with the id: ${id} was removed from cloudinary`;
    } catch (error) {
      throw new NotFoundException('The image could not be deleted.');
    }
  }


  private async uploadFileToCloudinary( 
    file: Express.Multer.File 
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'teslo-shop' },
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }

}
