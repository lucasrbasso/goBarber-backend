import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: Request): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) {
            throw new AppError('User does not exists.');
        }

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
    }
}

export default SendForgotPasswordEmailService;
