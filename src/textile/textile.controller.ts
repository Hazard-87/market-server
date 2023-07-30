import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TextileService } from './textile.service'
import { TextileEntity } from './entities/textile.entity'
import { CreateTextileDto, QueryArg } from './dto/create-textile.dto'
import { UpdateTextileDto } from './dto/update-textile.dto'

@Controller('textile')
@ApiTags('textile')
export class TextileController {
  constructor(private readonly textileService: TextileService) {}

  @Post()
  create(@Body() createTextileDto: CreateTextileDto) {
    return this.textileService.create(createTextileDto)
  }

  @ApiOkResponse({
    type: [TextileEntity]
  })
  @Get()
  findByParams(@Query('id') id?: string | string[], @Query() query?: QueryArg) {
    if (id) {
      return this.textileService.findByIds(id)
    } else {
      return this.textileService.findAll(query)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextileDto: UpdateTextileDto) {
    return this.textileService.update(+id, updateTextileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textileService.remove(+id)
  }
}
