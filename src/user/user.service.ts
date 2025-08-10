import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() {
        // Service initialization logic can go here
    }

    registerUser(userData: any): string {
        // Logic to register a user
        return 'User registered successfully';
    }

    loginUser(userData: any): string {
        // Logic to login a user
        return 'User logged in successfully';
    }
}
