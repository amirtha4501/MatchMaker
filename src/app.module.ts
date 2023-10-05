import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProfileRepository } from './repository/profile.repository';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './jwt-strategy';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 86400 }
    }),
    TypeOrmModule.forFeature([
      ProfileRepository,
      AuthRepository
    ]),
  ],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [
    JwtStrategy,
    AppService,
    AuthService
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule
  ]
})
export class AppModule {
  constructor() {
    const logger = new Logger()
    logger.log(process.env.JWT_SECRET, "App module");
    console.log(process.env.JWT_SECRET, "App module");
  }
}
