import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProfileController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProvidersService = container.resolve(ListProvidersService);
        const user_id = request.user.id;

        const providers = await listProvidersService.execute({ user_id });

        return response.json(classToClass(providers));
    }
}
