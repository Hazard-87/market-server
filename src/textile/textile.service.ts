import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { CreateTextileDto } from './dto/create-textile.dto'
import { TextileEntity } from './entities/textile.entity'
import { ImageService } from '../image/image.service'
import { ImageEntity } from '../image/entities/image.entity'
import { UpdateTextileDto } from './dto/update-textile.dto'

@Injectable()
export class TextileService {
  constructor(
    private imageRepository: ImageService,
    @InjectRepository(TextileEntity)
    private repository: Repository<TextileEntity>
  ) {}

  async create(dto: CreateTextileDto) {
    const images = await this.imageRepository.findImagesByIds(dto.images)
    return this.repository.save({ ...dto, images })
  }

  findByIds(id) {
    return this.repository.findByIds(id)
  }

  async findAll(query) {
    const limit = 10

    const qb = this.repository
      .createQueryBuilder('textile')
      .orderBy('textile.id', query.order || 'ASC')

    if (!query.limit) {
      qb.take(limit)
    } else if (query.limit !== 'all') {
      qb.take(+query.limit || limit)
    }
    qb.skip(+query.offset || 0)

    delete query.limit
    delete query.offset
    delete query.order

    const items = []
    const params = []
    const keys = Object.keys(query)
    keys.forEach((key) => {
      if (Array.isArray(query[key])) {
        query[key].forEach((item) => {
          items.push({ [key]: item })
        })
      } else {
        params.push({ [key]: query[key] })
      }
    })

    qb.andWhere(params).andWhere(
      new Brackets((qb) => {
        items.forEach((item, idx) => {
          if (idx === 0) {
            qb.where(item)
          } else {
            qb.orWhere(item)
          }
        })
      })
    )

    const [result, total] = await qb.getManyAndCount()

    return {
      result,
      total
    }
  }

  async update(id: number, dto: UpdateTextileDto) {
    const images = (await this.imageRepository.findImagesByIds(dto.images)) as ImageEntity[]
    return this.repository.update(id, { ...dto, images })
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
