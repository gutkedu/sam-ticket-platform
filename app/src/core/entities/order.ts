import { randomUUID } from 'crypto';
import { Optional } from '../types/optional';
import { Item } from './base';

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface OrderProps {
    data: {
        id: string;
        ticketId: string;
        costumerId: string;
        status: OrderStatus;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class Order extends Item<OrderProps> {
    get pk() {
        return `ORDER#${this.props.data.costumerId}`;
    }

    get sk() {
        return `TICKET#${this.props.data.ticketId}`;
    }

    get id() {
        return this.props.data.id;
    }

    get ticketId() {
        return this.props.data.ticketId;
    }

    get costumerId() {
        return this.props.data.costumerId;
    }

    get status() {
        return this.props.data.status;
    }

    set status(status: OrderStatus) {
        this.props.data.status = status;
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

    static create(props: Optional<OrderProps, 'createdAt'>) {
        const order = new Order({
            ...props,
            id: props.data.id ?? randomUUID(),
            status: props.data.status ?? OrderStatus.PENDING,
            updatedAt: props.updatedAt ?? new Date(),
            createdAt: props.createdAt ?? new Date(),
        });

        return order;
    }
}
