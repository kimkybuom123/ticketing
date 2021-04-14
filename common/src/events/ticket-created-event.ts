import { Subjects } from './subjects';

export interface TicketCreatedEvent {
  subjects: Subjects.TicketCreated;
  data: {
    id: any;
    title: any;
    price: number;
    userId: string;
  };
}
