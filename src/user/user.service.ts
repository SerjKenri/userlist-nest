import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

//model
import { Users } from './user.model';
import { Profiles } from 'src/profiles/profiles.model';

//dto
import { CreateGeneralDto } from './dto/create-general.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByRole } from './dto/get-user-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users) private userRep: typeof Users,
    @InjectModel(Profiles) private profileRep: typeof Profiles,
  ) {}

  async createUser(dto: CreateGeneralDto) {
    const { username, email, role, firstName, lastName, state } = dto;

    const userD: CreateUserDto = {
      username,
      email,
      role,
    };

    const profileD: CreateProfileDto = {
      firstName,
      lastName,
      state,
    };

    const users = await this.userRep.create(userD);
    const profiles = await this.profileRep.create(profileD);

    await users.$set('profile', profiles.id);

    return users;
  }

  async getUsers() {
    const users = await this.userRep.findAll({ include: { all: true } });
    return users;
  }

  async getUserByRole(dto: GetUserByRole) {
    const { role } = dto;
    const users = await this.userRep.findAll({ where: { role: role } });

    return users;
  }

  async updateUser(dto: UpdateUserDto) {
    const { id, username, email, role, firstName, lastName, state } = dto;

    const user = await this.userRep.findByPk(id);

    if (!user) {
      throw new HttpException(
        `User not found, please check id`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    if (firstName || lastName || state) {
      const profile = await this.profileRep.findByPk(user.profileId);

      if (firstName) profile.firstName = firstName;
      if (lastName) profile.lastName = lastName;
      if (state) profile.state = state;

      await profile.save();
    }

    const updatedUser = await this.userRep.findByPk(id, {
      include: { all: true },
    });

    return updatedUser;
  }

  async delUser(dto: DeleteUserDto) {
    const { id } = dto;
    const user = await this.userRep.findByPk(id);

    if (!user) {
      throw new HttpException(
        `User not found, please check id`,
        HttpStatus.NOT_FOUND,
      );
    }
    await Users.destroy({ where: { id } });
    await Profiles.destroy({ where: { id: user.profileId } });

    return `User with id: ${id} deleted`;
  }
}
