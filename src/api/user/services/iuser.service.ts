import { UserDTO } from '../../../dto';

export interface IUserService {
  findUser(id: string): Promise<UserDTO>;
}
