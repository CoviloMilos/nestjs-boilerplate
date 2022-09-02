import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty()
  email: string;
}
