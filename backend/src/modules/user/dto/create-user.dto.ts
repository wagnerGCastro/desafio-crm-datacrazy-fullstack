import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper, RegExHelper } from '@/utils/helpers';
import { RoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  role: RoleEnum;
}
