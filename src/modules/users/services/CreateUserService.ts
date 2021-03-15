import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreatUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({ name, email, password }: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used', 400);
        }

        const hashedPassword = await hash(password, 10);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        delete user.password;

        return user;
    }
}

export default CreatUserService;
