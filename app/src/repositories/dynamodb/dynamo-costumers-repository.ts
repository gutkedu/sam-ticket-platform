import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
} from '@aws-sdk/client-dynamodb';

import { Costumer } from 'core/entities/costumer';
import { CostumersRepository } from 'repositories/costumers-repository';

export class DynamoCostumersRepository implements CostumersRepository {
    private client: DynamoDBClient;

    constructor() {
        this.client = new DynamoDBClient({
            region: process.env.REGION ?? 'us-east-1',
        });
    }
    async create(costumer: Costumer): Promise<Costumer> {
        try {
            const command = new PutItemCommand({
                TableName: process.env.TABLE_NAME ?? '',
                Item: costumer.toDynamoItem(),
            });

            await this.client.send(command);

            return costumer;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<Costumer | null> {
        try {
            const command = new GetItemCommand({
                TableName: process.env.TABLE_NAME ?? '',
                Key: {
                    pk: { S: `COSTUMER#${email}` },
                    sk: { S: `COSTUMER#${email}` },
                },
            });
            const { Item } = await this.client.send(command);

            if (!Item) {
                return null;
            }

            return Costumer.fromDynamoItem(Item);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
