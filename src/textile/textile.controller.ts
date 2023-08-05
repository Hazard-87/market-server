import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TextileService } from './textile.service'
import { TextileEntity } from './entities/textile.entity'
import { CreateTextileDto, QueryArg } from './dto/create-textile.dto'
import { UpdateTextileDto } from './dto/update-textile.dto'
import { Roles } from '../decorators/roles.decorator'
import { Public } from '../decorators/public.decorator'

@Controller('textiles')
@ApiTags('textiles')
export class TextileController {
  constructor(private readonly textileService: TextileService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @Roles('admin')
  create(@Body() createTextileDto: CreateTextileDto) {
    return this.textileService.create(createTextileDto)
  }

  @Public()
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
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTextileDto: UpdateTextileDto) {
    return this.textileService.update(+id, updateTextileDto)
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.textileService.remove(+id)
  }
}
