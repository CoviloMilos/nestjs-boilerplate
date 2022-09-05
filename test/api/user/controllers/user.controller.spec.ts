import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../src/api/user/controllers';
import { CreateUserDTO } from '../../../../src/dto/request';
import { UserDTO } from '../../../../src/dto/response';
import { USER_SERVICE } from '../../../../src/utils/constants';

describe('User Controller', () => {
  const createUser: CreateUserDTO = {
    name: 'milos',
    email: 'milos@gmail.com',
    confirmEmail: 'milos@gmail.com',
  };

  const user: UserDTO = {
    id: 'c790176a-2d32-11ed-b670-0adaf8a306c3',
    name: 'milos',
    email: 'milos@gmail.com',
    updatedAt: new Date(),
    registeredDays: 0,
  };
  const users: UserDTO[] = [user];

  let userController: UserController;

  const mockUserService = {
    findWeekOldUsers: jest.fn(),
    findUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USER_SERVICE,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined;
  });

  it('should return array of week old users', async () => {
    // Setup
    const findWeekOldUsersSpy = jest
      .spyOn(mockUserService, 'findWeekOldUsers')
      .mockReturnValueOnce(users);

    // Execute
    const result = await userController.findWeekOldUsers();

    // Expect
    expect(result.length).toBe(users.length);
    expect(findWeekOldUsersSpy).toHaveBeenCalled();
  });

  it('should return user by id', async () => {
    // Setup
    const findUserSpy = jest
      .spyOn(mockUserService, 'findUser')
      .mockReturnValueOnce(user);

    // Execute
    const result = await userController.findUser(user.id);

    // Expect
    expect(result).toMatchObject(user);
    expect(findUserSpy).toHaveBeenCalledWith(user.id);
  });

  it('should create user', async () => {
    // Setup
    const createUserSpy = jest
      .spyOn(mockUserService, 'createUser')
      .mockReturnValueOnce(user);

    // Execute
    const result = await userController.createUser(createUser);

    // Expect
    expect(result).toMatchObject(user);
    expect(createUserSpy).toHaveBeenCalledWith(createUser);
  });
});
