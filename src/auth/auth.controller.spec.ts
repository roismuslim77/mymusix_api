import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
            login: jest.fn().mockResolvedValue({ access_token: 'fake-jwt-token' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const result = await authController.register({ username: 'user123', password: 'password123' });

    expect(authService.register).toHaveBeenCalledWith('user123', 'password123');
    expect(result).toEqual({ message: 'User registered successfully' });
  });

  it('should return a token when login is successful', async () => {
    const result = await authController.login({ username: 'user123', password: 'password123' });

    expect(authService.login).toHaveBeenCalledWith('user123', 'password123');
    expect(result).toEqual({ access_token: 'fake-jwt-token' });
  });

  it('should throw UnauthorizedException on invalid login', async () => {
    jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException('Invalid credentials'));

    await expect(authController.login({ username: 'wronguser', password: 'wrongpass' }))
      .rejects
      .toThrow(UnauthorizedException);
  });
});
