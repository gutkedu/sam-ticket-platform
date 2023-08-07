import { Costumer } from 'core/entities/costumer';
import { CostumersRepository } from 'repositories/costumers-repository';
import { hash } from 'bcryptjs';

interface CreateCostumerRequest {
    email: string;
    name: string;
    phone: string;
    password: string;
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
        password,
        photoPath,
    }: CreateCostumerRequest): Promise<CreateCostumerResponse> {
        const costumerExist = await this.costumerRepository.findByEmail(email);

        if (costumerExist) {
            throw new Error('Costumer already exists');
        }

        const passwordHash = await hash(password, 6);

        const costumer = Costumer.create({
            data: {
                email,
                name,
                phone,
                password: passwordHash,
                photoPath,
            },
        });

        await this.costumerRepository.create(costumer);

        return {
            costumer,
        };
    }
}
