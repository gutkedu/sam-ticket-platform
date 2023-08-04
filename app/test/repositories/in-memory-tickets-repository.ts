import { Ticket } from 'core/entities/ticket';
import { TicketsRepository } from 'repositories/tickets-repository';

export class InMemoryTicketsRepository implements TicketsRepository {
    create(ticket: Ticket): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Ticket | null> {
        throw new Error('Method not implemented.');
    }
    fetchByArtist(artist: string): Promise<Ticket[]> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
