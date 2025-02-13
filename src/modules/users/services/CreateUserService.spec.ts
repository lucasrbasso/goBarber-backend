import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('johndoe@exemple.com');
    });

    it('should not be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@exemple.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
