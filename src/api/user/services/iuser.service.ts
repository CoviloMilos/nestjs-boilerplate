import { UserDTO } from '../../../models';

export interface IUserService {
  findUser(): Promise<UserDTO>;
}
