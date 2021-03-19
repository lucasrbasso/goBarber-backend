import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@exemple.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing email password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@exemple.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
