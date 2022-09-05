import { CreateUserDTO } from '../../../dto/request';
import { UserDTO } from '../../../dto/response';

export interface IUserService {
  findUser(id: string): Promise<UserDTO>;
  findWeekOldUsers(): Promise<UserDTO[]>;
  createUser(user: CreateUserDTO): Promise<UserDTO>;
}
