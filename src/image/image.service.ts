import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from './entities/image.entity'
import { UpdateImageDto } from './dto/update-image.dto'
import { CreateImageDto } from './dto/create-image.dto'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private repository: Repository<ImageEntity>
  ) {}

  base64_encode(file) {
    return 'data:image/gif;base64,' + new Buffer(file).toString('base64')
  }

  create(file: Express.Multer.File) {
    const base64str = this.base64_encode(file.buffer)
    const dto: CreateImageDto = {
      url: base64str
    }
    return this.repository.save(dto)
  }

  findOne(id: number) {
    return this.repository.findOneById(id)
  }

  findImagesByIds(id: number[]) {
    return this.repository.findByIds(id)
  }

  update(id: number, dto: UpdateImageDto) {
    return this.repository.update(id, dto)
  }

  async remove(id: number) {
    const image = await this.repository.findOneById(+id)
    if (!image) {
      throw new NotFoundException('Такой файл не найден')
    }
    return this.repository.delete(id)
  }
}
