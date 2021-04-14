import { injectable, inject } from 'tsyringe';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '../repositories/INotificationsRepository';

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<Notification[]> {
        const notifications = await this.notificationsRepository.listById(
            user_id,
        );

        return notifications;
    }
}

export default ListProvidersService;
