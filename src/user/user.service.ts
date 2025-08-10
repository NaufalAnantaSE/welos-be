import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
    });

    if (existingUser) {
        throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const { password, updatedAt, deletedAt, ...result } = savedUser;

    return { message: 'User created successfully', user: result };
}


    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
