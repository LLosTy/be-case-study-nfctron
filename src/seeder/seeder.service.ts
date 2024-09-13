import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from '../data/entities/data.entity';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
    private configService: ConfigService,
  ) {}

  async seedData() {
    const userCount = await this.dataRepository.count();

    if (userCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    const seedCount = this.configService.get<number>('SEED_USER_COUNT', 100);

    const fakeData = Array.from({ length: seedCount }, () => ({
      firstName: faker.person.firstName().slice(0, 30),
      lastName: faker.person.lastName().slice(0, 30),
      email: faker.internet.email().slice(0, 40),
      password: faker.internet.password({ length: 60 }),
    }));

    try {
      await this.dataRepository.insert(fakeData);
      console.log('Database seeded with fake users!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}
