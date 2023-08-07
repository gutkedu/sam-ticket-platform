import { randomUUID } from 'crypto';
import { Item } from './base';

export interface CostumerProps {
    id?: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    photoPath: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Costumer extends Item<CostumerProps> {
    get pk() {
        return `COSTUMER#${this.props.email}`;
    }

    get sk() {
        return `COSTUMER#${this.props.email}`;
    }

    get id() {
        return this.props.id;
    }

    get email() {
        return this.props.email;
    }

    get name() {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
        this.touch();
    }

    get phone() {
        return this.props.phone;
    }

    set phone(phone: string) {
        this.props.phone = phone;
        this.touch();
    }

    set password(password: string) {
        this.props.password = password;
        this.touch();
    }

    get photoPath() {
        return this.props.photoPath;
    }

    set photoPath(photoPath: string | null) {
        this.props.photoPath = photoPath;
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
            id: { S: this.props.id },
            email: { S: this.props.email },
            name: { S: this.props.name },
            phone: { S: this.props.phone },
            password: { S: this.props.password },
            photoPath: { S: this.props.photoPath ?? '' },
            createdAt: { S: this.props.createdAt?.toISOString() },
            updatedAt: { S: this.props.updatedAt?.toISOString() },
        };
    }

    static create(props: CostumerProps) {
        const costumer = new Costumer({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        });

        return costumer;
    }
}
