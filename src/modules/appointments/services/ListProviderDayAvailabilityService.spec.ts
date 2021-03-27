// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

// let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 16, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            day: 20,
            year: 2021,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 16, available: false },
                { hour: 17, available: true },
            ]),
        );
    });
});
