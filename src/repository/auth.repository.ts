import { EntityRepository, Repository } from "typeorm";
import { SigninDto } from "../dto/signin.dto";
import { SignupDto } from "../dto/signup.dto";
import { User } from "../model/user.entity";
import { InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async signup(signupDto: SignupDto): Promise<void> {
        console.log("signupDto repo", signupDto);
        const { email, password, user_type, paid_status } = signupDto;

        const user_email = await this.findOne({ where: { email } });

        if (user_email) {
            throw new Error('Email already exists');
        } else {
            const user = new User();
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
    }

    async signin(signinDto: SigninDto): Promise<any> {
        const { user_id, email, password } = signinDto;

        const user_with_id = await this.findOne({ where: { user_id } });
        const user_with_email = await this.findOne({ where: { email } });

        if (user_with_id || user_with_email) {
            if (user_with_id && user_with_id.password === password) { return user_with_id; }
            if (user_with_email && user_with_email.password === password) { return user_with_email; }
        } else {
            return null;
        }
    }

    async getUserById(user_id: number): Promise<User> {
        return await this.findOne({ where: { user_id } });
    }
}