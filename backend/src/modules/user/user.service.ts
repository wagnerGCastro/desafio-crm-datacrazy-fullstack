import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Between, Raw, ILike } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'],
    });
  }

  async findCustom({ role, createdAtInit, createdAtEnd, sortOrder, q }) {
    let conditional: any = '';

    if (createdAtInit && createdAtEnd) {
      conditional = { createdAt: Between(createdAtInit, createdAtEnd) };
    } else if (createdAtInit && !createdAtEnd) {
      conditional = { createdAt: Raw((createdAt) => `${createdAt} >= '${createdAtInit}'`) };
    } else if (!createdAtInit && createdAtEnd) {
      conditional = { createdAt: Raw((createdAt) => `${createdAt} <= '${createdAtEnd}'`) };
    }

    if (role) {
      conditional = { ...conditional, role };
    }

    if (q) {
      conditional = { ...conditional, firstName: ILike(`%${q}%`) };
    }

    const users = await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'],
      where: conditional,
      order: {
        createdAt: sortOrder ? sortOrder : 'DESC',
      },
    });

    const filteredData = users.map((user) => {
      return {
        id: user.id,
        fullName: user.firstName + ' ' + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: 'active',
        avatar: '',
        avatarColor: 'primary',
      };
    });

    return {
      allData: users,
      users: filteredData,
      params: { role, createdAtInit, createdAtEnd, sortOrder, q },
      total: filteredData.length,
    };
  }

  async findOneOrFail({ id, email }: { id?: number; email?: string }) {
    try {
      const conditional = { id, email };

      return await this.userRepository.findOneOrFail({
        where: conditional,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ id });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.findOneOrFail({ id });
    await this.userRepository.softDelete(id);
  }
}
