
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
export class RegisterDto{
@IsNotEmpty()
 @IsString()
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