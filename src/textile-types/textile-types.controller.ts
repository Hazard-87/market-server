import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TextileTypesService } from './textile-types.service'
import { CreateTextileTypeDto } from './dto/create-textile-type.dto'
import { UpdateTextileTypeDto } from './dto/update-textile-type.dto'
import { Public } from '../decorators/public.decorator'
import { Roles } from '../decorators/roles.decorator'

@Controller('textileTypes')
@ApiTags('textileTypes')
export class TextileTypesController {
  constructor(private readonly textileTypesService: TextileTypesService) {}

  @Roles('admin')
  @Post()
  create(@Body() createTextileTypeDto: CreateTextileTypeDto) {
    return this.textileTypesService.create(createTextileTypeDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.textileTypesService.findAll()
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextileTypeDto: UpdateTextileTypeDto) {
    return this.textileTypesService.update(+id, updateTextileTypeDto)
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textileTypesService.remove(+id)
  }
}
