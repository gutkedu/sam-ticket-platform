import { randomUUID } from 'crypto';
import { Item } from './base';

export interface TicketProps {
    data: {
        id?: string;
        description?: string;
        artist: string;
        date: Date;
        numberOfTickets: number;
        location: string;
        price: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class Ticket extends Item<TicketProps> {
    get pk() {
        return `TICKET#${this.props.data.id}`;
    }

    get sk() {
        return `ARTIST#${this.props.data.artist}`;
    }

    get id() {
        return this.props.data.id;
    }

    get artist() {
        return this.props.data.artist;
    }

    get date() {
        return this.props.data.date;
    }

    set date(date: Date) {
        this.props.data.date = date;
        this.touch();
    }

    get numberOfTickets() {
        return this.props.data.numberOfTickets;
    }

    set numberOfTickets(numberOfTickets: number) {
        this.props.data.numberOfTickets = numberOfTickets;
        this.touch();
    }

    get location() {
        return this.props.data.location;
    }

    set location(location: string) {
        this.props.data.location = location;
        this.touch();
    }

    get price() {
        return this.props.data.price;
    }

    set price(price: number) {
        this.props.data.price = price;
        this.touch();
    }

    get description() {
        return this.props.data.description ?? '';
    }

    set description(description: string) {
        this.props.data.description = description;
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

    static create(props: TicketProps) {
        const ticket = new Ticket({
            ...props,
            id: props.data.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        });
        return ticket;
    }
}
