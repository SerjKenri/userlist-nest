import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

import { SequelizeModule } from '@nestjs/sequelize';

import { Users } from 'src/user/user.model';
import { Profiles } from './profiles.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profiles, Users])],
})
export class ProfilesModule {}
