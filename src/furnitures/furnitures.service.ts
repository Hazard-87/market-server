import { Injectable } from '@nestjs/common'
import { CreateFurnitureInput } from './dto/create-furniture.input'
import { FurnitureEntity } from './entities/furniture.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'

@Injectable()
export class FurnituresService {
  constructor(
    @InjectRepository(FurnitureEntity)
    private readonly repository: Repository<FurnitureEntity>
  ) {}

  create(dto: CreateFurnitureInput): Promise<FurnitureEntity> {
    return this.repository.save(dto)
  }

  find() {
    return this.repository.find()
  }

  async findAll(query) {
    const limit = 10

    const qb = this.repository
      .createQueryBuilder('furniture')
      .orderBy('furniture.id', query.order || 'ASC')

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

    return result

    //TODO: не работает
    // return {
    //   result,
    //   total
    // }
  }

  findOneById(id: number): Promise<FurnitureEntity> {
    return this.repository.findOneById(id)
  }

  update(id: number, dto: CreateFurnitureInput) {
    return this.repository.update(id, dto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
