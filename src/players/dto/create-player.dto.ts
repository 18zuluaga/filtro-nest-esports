import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enum/role.enum';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'The name of the player',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the player',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the player account',
    example: 'StrongP@ssw0rd!',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'The role of the player',
    example: Role.Player, // Ejemplo de un valor de rol
  })
  @IsEnum(Role)
  role: Role;
}
