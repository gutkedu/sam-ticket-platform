import { GetCostumerUseCase } from 'use-cases/get-costumer';
import { DynamoCostumersRepository } from 'repositories/dynamodb/dynamo-costumers-repository';

export function makeGetCostumerUseCase() {
    const costumersRepository = new DynamoCostumersRepository();
    const getCostumerUseCase = new GetCostumerUseCase(costumersRepository);
    return getCostumerUseCase;
}
