import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { TextileEntity } from './entities/textile.entity'
import { ImageService } from '../image/image.service'
import { UpdateTextileDto } from './dto/update-textile.dto'
import { CreateTextileDto } from './dto/create-textile.dto'

@Injectable()
export class TextileService {
  constructor(
    private imageService: ImageService,
    @InjectRepository(TextileEntity)
    private repository: Repository<TextileEntity>
  ) {}

  async create(dto: CreateTextileDto) {
    const result = await this.repository.save(dto)
    return await this.findOne(result.id)
  }

  async findOne(id: number) {
    const result = await this.repository.findOneById(id)
    const images = await this.imageService.findImagesByIds(result.images)
    return {
      ...result,
      images
    }
  }

  async findAll(query) {
    const limit = 10

    const qb = this.repository
      .createQueryBuilder('textiles')
      .orderBy('textiles.id', query.order || 'ASC')

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

    let IDs = []
    result.map((res) => {
      const ids = res.images.map((image) => image)
      IDs = [...IDs, ...ids]
    })

    const images = await this.imageService.findImagesByIds(IDs)

    const data = result.map((res) => {
      return {
        ...res,
        images: images.filter((image) => res.images.some((img) => img === image.id))
      }
    })

    return {
      result: data,
      total
    }
  }

  async update(id: number, dto: UpdateTextileDto) {
    await this.repository.update(id, { ...dto })
    return this.findOne(id)
  }

  async remove(id: number) {
    const result = await this.findOne(id)
    if (!result) {
      throw new NotFoundException('Такой файл не найден')
    }
    await this.repository.delete(id)
    return {
      status: 'OK'
    }
  }
}
