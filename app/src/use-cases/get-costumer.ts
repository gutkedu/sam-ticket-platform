import { Costumer } from 'core/entities/costumer';
import { CostumersRepository } from 'repositories/costumers-repository';

interface GetCostumerRequest {
    email: string;
}

interface GetCostumerResponse {
    costumer: Costumer;
}

export class GetCostumerUseCase {
    constructor(private readonly costumerRepository: CostumersRepository) {}

    async execute({ email }: GetCostumerRequest): Promise<GetCostumerResponse> {
        const costumer = await this.costumerRepository.findByEmail(email);

        if (!costumer) {
            throw new Error('Costumer not found');
        }

        return {
            costumer,
        };
    }
}
