import { CreateCostumerUseCase } from 'use-cases/create-costumer';
import { DynamoCostumersRepository } from 'repositories/dynamodb/dynamo-costumers-repository';

export function makeCreateCostumerUseCase() {
    const costumersRepository = new DynamoCostumersRepository();
    const createCostumerUseCase = new CreateCostumerUseCase(
        costumersRepository,
    );
    return createCostumerUseCase;
}
