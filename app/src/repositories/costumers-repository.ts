import { Costumer } from '../core/entities/costumer';

export interface CostumersRepository {
    create(costumer: Costumer): Promise<Costumer>;
    findByEmail(email: string): Promise<Costumer | null>;
}
