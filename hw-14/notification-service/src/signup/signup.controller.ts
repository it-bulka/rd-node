import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly signupService: SignupService,
  ) {}

  @Post()
  async signUp(@Body() user: { username: string; email: string }) {
    await this.signupService.signUp(user)

    return { status: 'ok', message: 'UserSignedUp event sent' };
  }
}
