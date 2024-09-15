import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from '../data/entities/data.entity';
import { Repository } from 'typeorm';
import { CreateDataDto } from '../data/dto/create-data.dto';
import { UpdateDataDto } from '../data/dto/update-data.dto';

@Injectable()
export class UniqueEmailValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  async transform(value: CreateDataDto | UpdateDataDto) {
    const email = value.email;

    const existingData = await this.dataRepository.findOne({
      where: { email },
    });

    if (existingData) {
      throw new ConflictException('Email already exists');
    }

    return value;
  }
}
