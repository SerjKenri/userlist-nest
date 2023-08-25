import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Users } from './user/user.model';
import { Profiles } from './profiles/profiles.model';

@Module({
  imports: [
    UserModule,
    ProfilesModule,

    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Profiles],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
