import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProvider,
    ): Promise<Appointment[]>;
}
