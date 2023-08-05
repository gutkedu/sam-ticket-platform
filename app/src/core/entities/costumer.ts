import { randomUUID } from 'crypto';
import { Item } from './base';

export interface CostumerProps {
    data: {
        id?: string;
        email: string;
        name: string;
        phone: string;
        password: string;
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

    get password() {
        return this.props.data.password;
    }

    set password(password: string) {
        this.props.data.password = password;
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

    toDynamoItem(): Record<string, unknown> {
        const { sk, pk } = this.keys();
        return {
            PK: { S: pk },
            SK: { S: sk },
            data: { S: JSON.stringify(this.props.data) },
            createdAt: { S: this.props.createdAt?.toISOString() },
            updatedAt: { S: this.props.updatedAt?.toISOString() },
        };
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
