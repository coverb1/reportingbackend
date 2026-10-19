import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10, {
    message: 'Phone number must contain exactly 10 digits',
  })
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone number must contain only digits',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  villageId: string;
}