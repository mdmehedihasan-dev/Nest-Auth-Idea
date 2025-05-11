import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'this-is-very-secret-key',
                ignoreExpiration: false,
            }
        )
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({ where: { id: payload.sub } });
        if (!user) {
          throw new UnauthorizedException();
        }
    
        return {
          userId: user.id,
          username: user.firstName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      }
    
}