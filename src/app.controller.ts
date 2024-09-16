import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DataService } from './data/data.service';
import { CreateDataDto } from './data/dto/create-data.dto';
import { UpdateDataDto } from './data/dto/update-data.dto';
import { UniqueEmailValidationPipe } from './unique-email-validator/unique-email-validator.pipe';

@ApiTags('data')
@Controller('data')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UsePipes(UniqueEmailValidationPipe)
  @ApiOperation({ summary: 'Create new data' })
  @ApiBody({ type: CreateDataDto })
  @ApiResponse({
    status: 201,
    description: 'The data has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createDataDto: CreateDataDto) {
    return this.dataService.create(createDataDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({ status: 200, description: 'Return all data.' })
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details for data by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the data.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(UniqueEmailValidationPipe)
  @ApiOperation({ summary: 'Update data' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateDataDto })
  @ApiResponse({
    status: 200,
    description: 'The data has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
    return this.dataService.update(+id, updateDataDto);
  }
}
