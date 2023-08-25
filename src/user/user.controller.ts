import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateGeneralDto } from './dto/create-general.dto';
import { GetUserByRole } from './dto/get-user-role.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getUsers();
  }

  @Get('/role/:role')
  async getAllByRoll(@Param() dto: GetUserByRole) {
    return this.userService.getUserByRole(dto);
  }

  @Post()
  async createUser(@Body() dto: CreateGeneralDto) {
    return this.userService.createUser(dto);
  }

  @Patch()
  async updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @Delete('/:id')
  async delUser(@Param() dto: DeleteUserDto) {
    return this.userService.delUser(dto);
  }
}
