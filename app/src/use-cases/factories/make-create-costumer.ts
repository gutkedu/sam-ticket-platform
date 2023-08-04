import { CreateCostumerUseCase } from 'use-cases/create-costumer';
import { InMemoryCostumersRepository } from '../../../test/repositories/in-memory-costumers-repository';

export function makeCreateCostumerUseCase() {
    const costumersRepository = new InMemoryCostumersRepository();
    const createCostumerUseCase = new CreateCostumerUseCase(
        costumersRepository,
    );
    return createCostumerUseCase;
}
