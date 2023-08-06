import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { ImageService } from './image.service'
import { UpdateImageDto } from './dto/update-image.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { Roles } from '../decorators/roles.decorator'
import { Public } from '../decorators/public.decorator'

@Controller('images')
@ApiTags('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Roles('admin')
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file)
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imageService.findOne(+id)
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextileImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateTextileImageDto)
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.imageService.remove(+id)
    return {
      status: 'OK'
    }
  }
}
