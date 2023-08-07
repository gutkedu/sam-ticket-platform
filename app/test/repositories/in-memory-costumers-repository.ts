import { Costumer } from 'core/entities/costumer';
import { CostumersRepository } from 'repositories/costumers-repository';

export class InMemoryCostumersRepository implements CostumersRepository {
    public items: Costumer[] = [];

    async create(costumer: Costumer): Promise<Costumer> {
        this.items.push(costumer);
        return costumer;
    }

    async findByEmail(email: string): Promise<Costumer | null> {
        const costumer = this.items.find((item) => item.email === email);
        return costumer ?? null;
    }
}
