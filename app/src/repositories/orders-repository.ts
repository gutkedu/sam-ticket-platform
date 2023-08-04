import { Order } from '../core/entities/order';

export interface OrdersRepository {
    create(order: Order): Promise<void>;
    findById(id: string): Promise<Order | null>;
    fetchByCostumer(costumerId: string): Promise<Order[]>;
    fetchByTicket(ticketId: string): Promise<Order[]>;
    deleteById(id: string): Promise<void>;
}
