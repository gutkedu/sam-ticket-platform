import { Costumer, CostumerProps } from 'core/entities/costumer';
import { faker } from '@faker-js/faker';
export function makeCostumer(override: Partial<CostumerProps> = {}) {
    const costumer = Costumer.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            photoPath: faker.system.filePath(),
            ...override.data,
        },
    });

    return costumer;
}
