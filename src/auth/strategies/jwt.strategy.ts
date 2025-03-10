import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abc123',
    });
  }

  validate(payload: any, req: any): unknown {
    // const token = req.get('Authorization')?.replace('Bearer ', '');
    // if (this.authService.isTokenBlacklisted(token)) {
    //   throw new UnauthorizedException('Token has been revoked');
    // }
    return payload;
  }
}
