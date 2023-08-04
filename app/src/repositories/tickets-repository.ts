import { Ticket } from '../core/entities/ticket';

export interface TicketsRepository {
    create(ticket: Ticket): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    fetchByArtist(artist: string): Promise<Ticket[]>;
    deleteById(id: string): Promise<void>;
}
