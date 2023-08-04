import { Order } from 'core/entities/order';
import { OrdersRepository } from 'repositories/orders-repository';

export class InMemoryOrdersRepository implements OrdersRepository {
    create(order: Order): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Order | null> {
        throw new Error('Method not implemented.');
    }
    fetchByCostumer(costumerId: string): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }
    fetchByTicket(ticketId: string): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
