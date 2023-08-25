export class UpdateUserDto {
  readonly id: number;
  readonly username?: string;
  readonly email?: string;
  readonly role?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly state?: string;
}
