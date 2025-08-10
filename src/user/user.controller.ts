import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // Module initialization logic can go here
    constructor(private readonly userService: UserService) {
        // You can use the userService for any initialization if needed
    }

    @Post('register')
    registerUser(userData: any): string {
        return this.userService.registerUser(userData);
    }

    @Post('login')
    loginUser(userData: any): string {
        return this.userService.loginUser(userData);
    }
}
