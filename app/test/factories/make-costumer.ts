import { Costumer, CostumerProps } from 'core/entities/costumer';
import { faker } from '@faker-js/faker';
export function makeCostumer(
    override: Partial<CostumerProps> = {},
    pk: string,
    sk: string,
) {
    console.log(override);

    const costumer = Costumer.create(
        {
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                password: faker.internet.password(),
                photoPath: faker.system.filePath(),
                ...override.data,
            },
        },
        pk,
        sk,
    );

    return costumer;
}
