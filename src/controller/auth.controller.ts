import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../model/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @Post('/signup')
    signup(@Body() signupDto: SignupDto): Promise<void> {
        console.log("signupDto", signupDto);
        return this.authService.signup(signupDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) signinDto: SigninDto): Promise<{ accessToken: string }> {
        return this.authService.signin(signinDto);
    }

    @Get('/users')
    getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

}
