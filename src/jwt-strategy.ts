import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepository } from "./repository/auth.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { Profile } from "./model/profile.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SECRET}`
        });

    }

    async validate(payload: JwtPayload) {
        const { user_id } = payload;
        const user = await this.authRepository.findOne({ where: { user_id } });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}