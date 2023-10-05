import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repository/auth.repository';
import { SigninDto } from '../dto/signin.dto';
import { JwtPayload } from '../jwt-payload.interface';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../model/user.entity';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto): Promise<void> {
        console.log("signupDto service :", signupDto);

        const { user_name, email, password, user_type, paid_status } = signupDto;

        const user_email = await this.authRepository.findOne({ where: { email } });

        if (user_email) {
            throw new Error('Email already exists');
        } else {
            const user = new User();
            user.user_name = user_name;
            user.email = email;
            user.password = password;
            user.user_type = user_type;
            user.paid_status = paid_status;

            try {
                await user.save();
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException();
            }
        }


        return null //this.authRepository.signup(signupDto);
    }

    async signin(signInDto: SigninDto): Promise<{ accessToken:string }> {
        const user = await this.authRepository.signin(signInDto);
        
        if(!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = { user_id: user.user_id };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
