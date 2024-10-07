import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  role: Role;
}
