import { describe, beforeAll, it, expect } from 'vitest';
import { InMemoryCostumersRepository } from '../../test/repositories/in-memory-costumers-repository';
import { GetCostumerUseCase } from './get-costumer';

import { makeCostumer } from '../../test/factories/make-costumer';

let costumersRepository: InMemoryCostumersRepository;
let sut: GetCostumerUseCase;

describe('GetCostumer', () => {
    beforeAll(() => {
        costumersRepository = new InMemoryCostumersRepository();
        sut = new GetCostumerUseCase(costumersRepository);
    });

    it('should get a existing costumer by email', async () => {
        const costumer = makeCostumer(
            {
                data: {
                    id: 1,
                    email: 'jondoe@email.com',
                },
            },
            'COSTUMER#1',
            'COSTUMER#1',
        );

        await costumersRepository.create(costumer);

        const findCostumer = await sut.execute({
            email: 'jondoe@email.com',
        });

        expect(findCostumer.costumer).toEqual(costumer);
    });

    it('should throw an error if costumer is not found', async () => {
        await expect(
            sut.execute({
                email: 'invalid-email',
            }),
        ).rejects.toThrow('Costumer not found');
    });
});
