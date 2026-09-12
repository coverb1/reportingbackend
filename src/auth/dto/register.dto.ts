
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
export class RegisterDto{
@IsString()
@IsNotEmpty()
 @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  villageId: string;
}