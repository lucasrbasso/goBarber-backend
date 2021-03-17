import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);
        const authenticateUser = new AuthenticateUser(fakeUsersRepository);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });
});
