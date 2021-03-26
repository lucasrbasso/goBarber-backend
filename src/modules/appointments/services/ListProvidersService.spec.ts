import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersServices from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersServices;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersServices(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@exemple.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@exemple.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
