import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  providers: [DataService],
  exports: [DataService, TypeOrmModule],
})
export class DataModule {}
