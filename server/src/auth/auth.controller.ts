import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
