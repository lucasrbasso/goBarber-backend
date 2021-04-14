import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });

        await this.ormRepository.save(notification);

        return notification;
    }

    public async listById(id: string): Promise<Notification[]> {
        const notifications = this.ormRepository.find({
            where: {
                recipient_id: { $eq: `${id}` },
            },
        });

        return notifications;
    }
}

export default NotificationsRepository;
