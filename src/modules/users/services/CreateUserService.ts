import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreatUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: Request): Promise<Omit<User, 'password'>> {
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

        const userReturn = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return userReturn;
    }
}

export default CreatUserService;
