import { Model, DataType, Table, Column, HasOne } from 'sequelize-typescript';
import { Users } from 'src/user/user.model';

interface ProfileCrationAttrs {
  firstName: string;
  lastName: string;
  state: string;
}

@Table({ tableName: 'profiles' })
export class Profiles extends Model<Profiles, ProfileCrationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @HasOne(() => Users)
  user: Users;
}
