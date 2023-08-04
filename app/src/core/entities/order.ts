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

    static create(
        props: Optional<OrderProps, 'createdAt'>,
        pk: string,
        sk: string,
    ) {
        const order = new Order(
            {
                ...props,
                id: props.data.id ?? randomUUID(),
                status: props.data.status ?? OrderStatus.PENDING,
                updatedAt: props.updatedAt ?? new Date(),
                createdAt: props.createdAt ?? new Date(),
            },
            pk,
            sk,
        );

        return order;
    }
}
