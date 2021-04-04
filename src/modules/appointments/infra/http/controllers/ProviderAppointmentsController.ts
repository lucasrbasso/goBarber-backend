import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProviderAppointments = container.resolve(
            ListProviderAppointments,
        );

        const provider_id = request.user.id;
        const { day, month, year } = request.query;

        const appointments = await listProviderAppointments.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(classToClass(appointments));
    }
}
