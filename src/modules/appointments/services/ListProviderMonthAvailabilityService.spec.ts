// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

// let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService();
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2021,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: false },
                { day: 22, available: true },
            ]),
        );
    });
});
