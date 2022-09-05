import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { DateHelperService } from '../../utils/helpers';

const calculateDaysRegistered = (params: TransformFnParams) => {
  const createdAt = params.obj['createdAt'];
  if (createdAt) return DateHelperService.timeDiffInDays(createdAt);
  else return null;
};
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

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Transform(calculateDaysRegistered)
  @ApiProperty()
  registeredDays: number;
}
