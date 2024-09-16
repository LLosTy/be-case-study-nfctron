import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDataDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'Jozo',
    minLength: 2,
  })
  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Mrkvicka',
    minLength: 2,
  })
  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'jozo.mrkvicka@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email.' })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'password123',
    minLength: 8,
    writeOnly: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  password: string;
}
