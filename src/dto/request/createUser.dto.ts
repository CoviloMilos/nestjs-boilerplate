import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsEqualTo } from '../../utils/custom.validator';

export class CreateUserDTO {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEqualTo('email')
  confirmEmail: string;
}
