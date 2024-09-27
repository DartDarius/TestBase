import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { ERROR_MESSAGE } from 'src/helpers/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authorizationService: AuthorizationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authorizationService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_PARAMS_NOT_FOUND);
    }
    return user;
  }
}
