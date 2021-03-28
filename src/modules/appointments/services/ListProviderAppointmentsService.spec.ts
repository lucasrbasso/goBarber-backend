// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

// let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentRepository,
        );
    });

    it('it should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            day: 20,
            month: 5,
            year: 2021,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
