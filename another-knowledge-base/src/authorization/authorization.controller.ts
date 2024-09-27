import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationService } from './authorization.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDecorator } from './decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @ApiOperation({
    summary: 'Refresh your token',
    description: 'Here you can refresh your token',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@UserDecorator() user: User) {
    return this.authorizationService.login(user);
  }
}
