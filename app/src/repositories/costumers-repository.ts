import { Costumer } from '../core/entities/costumer';

export interface CostumersRepository {
    create(costumer: Costumer): Promise<Costumer>;
    findById(id: string): Promise<Costumer | null>;
    findByEmail(email: string): Promise<Costumer | null>;
}
