import { GetCostumerUseCase } from 'use-cases/get-costumer';
import { InMemoryCostumersRepository } from '../../../test/repositories/in-memory-costumers-repository';

export function makeGetCostumerUseCase() {
    const costumersRepository = new InMemoryCostumersRepository();
    const getCostumerUseCase = new GetCostumerUseCase(costumersRepository);
    return getCostumerUseCase;
}
