import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListNotificationService from '@modules/notifications/services/ListNotificationByIdService';

export default class AppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const listNotification = container.resolve(ListNotificationService);

        const notifications = await listNotification.execute({ user_id });

        return response.json({ notifications });
    }
}
