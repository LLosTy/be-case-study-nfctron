import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { Repository } from 'typeorm';

@UsePipes(new ValidationPipe())
@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>,
  ) {}

  create(createDataDto: CreateDataDto): Promise<Data> {
    const data: Data = new Data();
    data.firstName = createDataDto.firstName;
    data.lastName = createDataDto.lastName;
    data.email = createDataDto.email;
    data.password = createDataDto.password;
    return this.dataRepository.save(data);
  }

  findAll(): Promise<Data[]> {
    return this.dataRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOne(id: number): Promise<Data> {
    const data = await this.dataRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data not found.');
    }
    return data;
  }

  async update(id: number, updateDataDto: UpdateDataDto): Promise<Data> {
    const exists = await this.dataRepository.findOneBy({ id });
    if (!exists) {
      throw new NotFoundException('Data not found');
    }
    const data: Data = new Data();
    data.firstName = updateDataDto.firstName;
    data.lastName = updateDataDto.lastName;
    data.email = updateDataDto.email;
    data.password = updateDataDto.password;
    data.id = id;
    return await this.dataRepository.save(data);
  }

  remove(id: number) {
    return this.dataRepository.delete(id);
  }
}
