import { Controller, Delete, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors( FileInterceptor('file') )
  uploadProductFile( 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /image\/(jpeg|jpg|png|gif|webp|bmp)/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })
        ]
      })
    ) file: Express.Multer.File 
  ) {
    return this.filesService.uploadImage( file );
  }

  @Delete('product/:id')
  remove(@Param('id') id: string) {
    return this.filesService.deleteImage(id);
  }
}
