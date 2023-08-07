import { Costumer } from 'core/entities/costumer';
import { CostumersRepository } from 'repositories/costumers-repository';

interface CreateCostumerRequest {
    email: string;
    name: string;
    phone: string;
    photoPath: string | null;
}

interface CreateCostumerResponse {
    costumer: Costumer;
}

export class CreateCostumerUseCase {
    constructor(private readonly costumerRepository: CostumersRepository) {}

    async execute({
        email,
        name,
        phone,
        photoPath,
    }: CreateCostumerRequest): Promise<CreateCostumerResponse> {
        const costumerExist = await this.costumerRepository.findByEmail(email);

        if (costumerExist) {
            throw new Error('Costumer already exists');
        }

        const costumer = Costumer.create({
            data: {
                email,
                name,
                phone,
                photoPath,
            },
        });

        await this.costumerRepository.create(costumer);

        return {
            costumer,
        };
    }
}
