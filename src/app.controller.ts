import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UsePipes,
} from '@nestjs/common';
import { DataService } from './data/data.service';
import { CreateDataDto } from './data/dto/create-data.dto';
import { UpdateDataDto } from './data/dto/update-data.dto';
import { UniqueEmailValidationPipe } from './unique-email-validator/unique-email-validator.pipe';

@Controller('data')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UsePipes(UniqueEmailValidationPipe)
  create(@Body() createDataDto: CreateDataDto) {
    return this.dataService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(UniqueEmailValidationPipe)
  update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
    return this.dataService.update(+id, updateDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
