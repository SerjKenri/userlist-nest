import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { Profiles } from 'src/profiles/profiles.model';
import { Users } from './user.model';

import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([Users, Profiles])],
})
export class UserModule {}
