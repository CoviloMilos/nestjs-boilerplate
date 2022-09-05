import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty({ required: false })
  name: string;
  @Expose()
  @ApiProperty()
  email: string;
}
