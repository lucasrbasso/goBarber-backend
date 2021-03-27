import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailability {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const { provider_id } = request.params;
        const { month, year } = request.body;

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id,
                month,
                year,
            },
        );

        return response.json(availability);
    }
}
