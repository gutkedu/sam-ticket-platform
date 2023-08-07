import { Costumer, CostumerProps } from 'core/entities/costumer';
import { faker } from '@faker-js/faker';
export function makeCostumer(override: Partial<CostumerProps> = {}) {
    const costumer = Costumer.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: faker.internet.password(),
        photoPath: faker.system.filePath(),
        ...override,
    });

    return costumer;
}
