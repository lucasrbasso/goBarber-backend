import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface Request {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithNewEmail = await this.usersRepository.findByEmail(email);

        if (userWithNewEmail && userWithNewEmail.id !== user_id) {
            throw new AppError('This email is already in use!');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError(
                'You need to inform the old password to set a new password',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old Password does not match');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;
