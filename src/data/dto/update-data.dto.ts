import { PartialType } from '@nestjs/swagger';
import { CreateDataDto } from './create-data.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataDto extends PartialType(CreateDataDto) {
  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false, writeOnly: true })
  password?: string;
}