import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDataDto {
  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  password: string;
}
