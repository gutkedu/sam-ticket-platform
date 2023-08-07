import { randomUUID } from 'crypto';
import { Item } from './base';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

export interface CostumerProps {
    data: {
        id?: string;
        email: string;
        name: string;
        phone: string;
        photoPath: string | null;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export class Costumer extends Item<CostumerProps> {
    get pk() {
        return `COSTUMER#${this.props.data.email}`;
    }

    get sk() {
        return `COSTUMER#${this.props.data.email}`;
    }

    get id() {
        return this.props.data.id;
    }

    get email() {
        return this.props.data.email;
    }

    get name() {
        return this.props.data.name;
    }

    set name(name: string) {
        this.props.data.name = name;
        this.touch();
    }

    get phone() {
        return this.props.data.phone;
    }

    set phone(phone: string) {
        this.props.data.phone = phone;
        this.touch();
    }

    get photoPath() {
        return this.props.data.photoPath;
    }

    set photoPath(photoPath: string | null) {
        this.props.data.photoPath = photoPath;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    toDynamoItem(): Record<string, AttributeValue> {
        const { sk, pk } = this.keys();
        return {
            pk: { S: pk },
            sk: { S: sk },
            data: { S: JSON.stringify(this.props.data) },
            createdAt: {
                S:
                    this.props.createdAt?.toISOString() ??
                    new Date().toISOString(),
            },
            updatedAt: {
                S:
                    this.props.updatedAt?.toISOString() ??
                    new Date().toISOString(),
            },
        };
    }

    static fromDynamoItem(item: Record<string, AttributeValue>): Costumer {
        const { data, createdAt, updatedAt } = item;
        return new Costumer({
            data: JSON.parse(data.S ?? '{}'),
            createdAt: new Date(createdAt.S ?? new Date().toISOString()),
            updatedAt: new Date(updatedAt.S ?? new Date().toISOString()),
        });
    }

    static create(props: CostumerProps) {
        const costumer = new Costumer({
            data: {
                ...props.data,
                id: props.data.id ?? randomUUID(),
            },
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        });

        return costumer;
    }
}
