import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user123' },
        password: { type: 'string', example: 'securePass123' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User berhasil didaftarkan' })
  @ApiResponse({ status: 400, description: 'Gagal mendaftarkan user' })
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login Get Token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'tester123' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login Berhasil' })
  @ApiResponse({ status: 400, description: 'Gagal Login' })
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}
