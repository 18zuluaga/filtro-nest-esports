import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    description: 'Las credenciales del usuario para iniciar sesión',
    type: Object,
    examples: {
      example: {
        value: { email: 'usuario@example.com', password: 'contraseña' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    schema: {
      example: {
        accessToken: 'token_de_acceso',
        user: {
          id: 1,
          email: 'usuario@example.com',
          // otros campos de usuario
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }

  @Post('register')
  @ApiBody({
    description: 'Datos del jugador para el registro',
    type: CreatePlayerDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Registro exitoso',
    schema: {
      example: {
        id: 1,
        email: 'usuario@example.com',
        // otros campos de jugador
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Error en los datos de registro' })
  async register(@Body() registerDto: CreatePlayerDto) {
    return this.authService.register(registerDto);
  }
}
