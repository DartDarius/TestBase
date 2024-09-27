import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../authorization/interfaces/user.interface';
import { AuthorizationService } from './authorization.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
  async login(@Req() req: CustomRequest) {
    const { user } = req;
    return this.authorizationService.login(user);
  }
}
