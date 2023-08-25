import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Profiles } from 'src/profiles/profiles.model';

interface UserCrationAttrs {
  username: string;
  email: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCrationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'user',
  })
  role: string;

  @ForeignKey(() => Profiles)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  profileId: number;

  @BelongsTo(() => Profiles)
  profile: Profiles;
}
