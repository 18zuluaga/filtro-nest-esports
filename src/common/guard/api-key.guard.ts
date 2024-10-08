import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { configDotenv } from 'dotenv';

configDotenv();
@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly API_KEY = process.env.API_KEY;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
