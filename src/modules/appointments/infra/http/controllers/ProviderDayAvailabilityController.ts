import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailability {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const { provider_id } = request.params;
        const { day, month, year } = request.query;

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
