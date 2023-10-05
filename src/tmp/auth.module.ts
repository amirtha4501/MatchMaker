import { Module, Logger } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt-strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: 3600 }
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})

export class AuthModule {
    constructor() {
        const logger = new Logger()
        logger.log(process.env.JWT_SECRET, "Auth module");
    }
    
}
