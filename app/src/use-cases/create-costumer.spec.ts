import { CreateCostumerUseCase } from './create-costumer';
import { describe, beforeAll, it, expect } from 'vitest';
import { InMemoryCostumersRepository } from '../../test/repositories/in-memory-costumers-repository';

let costumersRepository: InMemoryCostumersRepository;
let sut: CreateCostumerUseCase;

describe('CreateCostumer', () => {
    beforeAll(() => {
        costumersRepository = new InMemoryCostumersRepository();
        sut = new CreateCostumerUseCase(costumersRepository);
    });

    it('should create a costumer', async () => {
        const { costumer } = await sut.execute({
            email: 'any_email',
            name: 'any_name',
            phone: 'any_phone',
            photoPath: 'any_photoPath',
        });

        expect(costumer.id).toBeTruthy();
        expect(costumer.email).toBe('any_email');
    });
});
