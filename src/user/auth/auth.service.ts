import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid email or password');
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            message: 'Login successfully',
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                nomorHp: user.nomorHp,
            },
        };
    }
}
