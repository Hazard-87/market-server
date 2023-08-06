import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TextileTypeEntity } from './entities/textile-type.entity'
import { CreateTextileTypeDto } from './dto/create-textile-type.dto'
import { UpdateTextileTypeDto } from './dto/update-textile-type.dto'

@Injectable()
export class TextileTypesService {
  constructor(
    @InjectRepository(TextileTypeEntity)
    private repository: Repository<TextileTypeEntity>
  ) {}

  async create(dto: CreateTextileTypeDto) {
    const result = await this.repository.save(dto)
    return await this.findOne(result.id)
  }

  async findAll() {
    const qb = this.repository.createQueryBuilder('textileTypes')

    const [result, total] = await qb.getManyAndCount()
    return {
      result,
      total
    }
  }

  findOne(id: number) {
    return this.repository.findOneById(id)
  }

  async update(id: number, dto: UpdateTextileTypeDto) {
    await this.repository.update(id, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return {
      status: 'OK'
    }
  }
}
