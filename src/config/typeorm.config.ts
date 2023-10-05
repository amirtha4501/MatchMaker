import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';
import { Coupon } from '../model/coupon.entity';
import { Feedback } from '../model/feedback.entity';
import { Message } from '../model/message.entity';
import { Payment } from '../model/payment.entity';
import { Plan } from '../model/plan.entity';
import { Profile } from '../model/profile.entity';
import { Testimonial } from '../model/testimonial.entity';
import { User } from '../model/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    username: env.DB_USER || 'postgres',
    password: env.DB_PASS || 'password',
    database: env.DB_NAME || 'matrimony',
    entities: [Coupon, Feedback, Message, Payment, Plan, Profile, Testimonial, User],
    // entities: ['**/*.entity{.ts,.js}'],
    synchronize: true
};
