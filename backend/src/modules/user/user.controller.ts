import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Patch } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  async index() {
    return this.userService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.userService.findOneOrFail(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
