import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// findAll
const userEntityList: UserEntity[] = [
  new UserEntity({
    id: 1,
    firstName: 'firstName-1',
    lastName: 'lastName-1',
    email: 'usermail1@teste.com',
    password: '123456',
    role: 'admin',
  }),
  new UserEntity({
    id: 2,
    firstName: 'firstName-2',
    lastName: 'lastName-2',
    email: 'usermail2@teste.com',
    password: '123456',
    role: 'admin',
  }),
];

const updatedUserEntityItem = new UserEntity({
  id: 1,
  firstName: 'firstName-1',
  lastName: 'lastName-1',
  email: 'usermail1@teste.com',
  password: '123456',
  role: 'admin',
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            create: jest.fn().mockReturnValue(userEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedUserEntityItem),
            save: jest.fn().mockResolvedValue(userEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a user entity list successfully', async () => {
      const result = await userService.findAll();

      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a user entity item successfully', async () => {
      const result = await userService.findOneOrFail({ id: 1 });

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(userService.findOneOrFail({ id: 1 })).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user entity item successfully', async () => {
      const data: CreateUserDto = {
        firstName: 'firstName-1',
        lastName: 'lastName-1',
        email: 'usermail1@teste.com',
        password: '123456',
        role: 'admin',
      };

      const result = await userService.create(data);

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const data: CreateUserDto = {
        firstName: 'firstName-1',
        lastName: 'lastName-1',
        email: 'usermail1@teste.com',
        password: '123456',
        role: 'admin',
      };

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      expect(userService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user entity item successfully', async () => {
      const data: UpdateUserDto = {
        firstName: 'firstName-1',
        lastName: 'lastName-1',
        email: 'usermail1@teste.com',
        password: '123456',
        role: 'admin',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(updatedUserEntityItem);

      const result = await userService.update(1, data);

      expect(result).toEqual(updatedUserEntityItem);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      const data: UpdateUserDto = {
        firstName: 'firstName-1',
        lastName: 'lastName-1',
        email: 'usermail1@teste.com',
        password: '123456',
        role: 'admin',
      };

      expect(userService.update(1, data)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateUserDto = {
        firstName: 'firstName-1',
        lastName: 'lastName-1',
        email: 'usermail1@teste.com',
        password: '123456',
        role: 'admin',
      };

      expect(userService.update(1, data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a todo entity item successfully', async () => {
      const result = await userService.remove(1);

      expect(result).toBeUndefined();
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(userService.remove(1)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'softDelete').mockRejectedValueOnce(new Error());

      expect(userService.remove(1)).rejects.toThrowError();
    });
  });
});
